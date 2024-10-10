
use cosmwasm_std::{from_binary, Addr, CanonicalAddr, Uint128, Uint64};
use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdError, StdResult,
};
use secret_toolkit::crypto::{hkdf_sha_256, sha_256, ContractPrng};
use secret_toolkit::notification::{get_seed, notification_id, ChannelInfoData, Notification, NotificationData};
use secret_toolkit::permit::Permit;

use crate::msg::{ContractsResponse, ExecuteMsg, ExecuteReceiveMsg, InstantiateMsg, QueryAnswer, QueryMsg, QueryWithPermit};
use crate::notify::AcceptedNotificationData;
use crate::state::{config, config_read, ClientContract, Contract, State, SNIP52_INTERNAL_SECRET};
use secret_toolkit::snip20::{register_receive_msg, transfer_msg};

pub const SEED_LEN: usize = 32;

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    let state = State {
        current_contract_id: Uint128::new(0),
        contracts: Vec::new(),
        owner: info.sender.clone(),
    };

    config(deps.storage).save(&state)?;

    let register_msg = register_receive_msg(
        env.contract.code_hash.clone(), 
        None, 
        256, 
        "3aad972a2c59b248993a22091d12b2774a347e10581af20595abc4d977080257".to_string(), 
        "secret1kw9ajrrhxxx6tdms543r92rs2ml8uqt5vsek8v".to_string(),
    )?;

    // SNIP-52 init
    // create an internal secret
    let rng_seed = env.block.random.as_ref().unwrap();
    let mut prng = ContractPrng::from_env(&env);
    let salt = Some(sha_256(&prng.rand_bytes()).to_vec());
    let internal_secret = hkdf_sha_256(
        &salt,
        rng_seed.0.as_slice(),
        "contract_internal_secret".as_bytes(),
        SEED_LEN,
    )?;
    SNIP52_INTERNAL_SECRET.save(deps.storage, &internal_secret)?;

    Ok(Response::new()
        .add_message(register_msg)
    )
}

#[entry_point]
pub fn execute(deps: DepsMut, env: Env, info: MessageInfo, msg: ExecuteMsg) -> StdResult<Response> {
    match msg {
        ExecuteMsg::Receive { sender, from, amount, msg } => try_receive(deps, env, info, sender, from, amount, msg),
    }
}

pub fn try_receive(deps: DepsMut, env: Env, info: MessageInfo, sender: Addr, from: Addr, amount: Uint128, msg: Option<Binary>) -> StdResult<Response> {
    
    deps.api.debug("callback called");

    let mut res = Response::default();
    let secret = SNIP52_INTERNAL_SECRET.load(deps.storage)?;
    let secret = secret.as_slice();

    if let Some(msg) = msg {
        match from_binary(&msg)? {

            ExecuteReceiveMsg::Create { wanting_coin_addr, wanting_amount } => {
                deps.api.debug("Received Create Request");

                config(deps.storage).update::<_, StdError>(|mut state| {
                    let contract = Contract {
                        id: state.current_contract_id.to_string(),
                        user_wallet_address: sender.to_string(),
                        offering_coin_addr: info.sender.to_string(), 
                        offering_amount: amount,
                        wanting_coin_addr: wanting_coin_addr,
                        wanting_amount: wanting_amount,
                        expiration: String::new(),
                    };
                    state.current_contract_id = Uint128::new(state.current_contract_id.u128() + 1);
                    state.contracts.push(contract);
                    Ok(state)
                })?;
            },

            ExecuteReceiveMsg::Accept { id } => {
                deps.api.debug("Received Accept Request");
                                
                config(deps.storage).update::<_, StdError>(|mut state| {

                    let contract = state.contracts.iter().find(|&contract| contract.id == id).unwrap();

                    if contract.wanting_amount == amount && contract.wanting_coin_addr == info.sender.to_string() {

                        // Valid Acceptance. Send the currencies to each person and delete the contract.
                        deps.api.debug("Valid Accept Request");

                        let intial_transfer_message = transfer_msg(sender.to_string(),
                            contract.offering_amount,
                            None,
                            None, 
                            256,
                            "3aad972a2c59b248993a22091d12b2774a347e10581af20595abc4d977080257".to_string(), 
                            contract.offering_coin_addr.to_string(),
                        )?;
                        deps.api.debug(&format!("Initial Transfer Message {:?}", intial_transfer_message));

                        let acceptance_transfer_message = transfer_msg(contract.user_wallet_address.to_string(),
                            contract.wanting_amount,
                            None,
                            None, 
                            256,
                            "3aad972a2c59b248993a22091d12b2774a347e10581af20595abc4d977080257".to_string(), 
                            contract.wanting_coin_addr.to_string(),
                        )?;
                        deps.api.debug(&format!("Acceptance Transfer Message {:?}", acceptance_transfer_message));

                        // SNIP-52 add `accepted` push notification
                        let notification = Notification::new(
                            Addr::unchecked(contract.user_wallet_address.clone()),
                            AcceptedNotificationData {
                                id: id.clone(),
                            }
                        )
                        .to_txhash_notification(deps.api, &env, secret, None)?;

                        res = Response::default()
                            .add_message(intial_transfer_message)
                            .add_message(acceptance_transfer_message)
                            .add_attribute_plaintext(
                                notification.id_plaintext(),
                                notification.data_plaintext(),
                            );
                        
                        state.contracts.retain(|contract| contract.id != id);

                        Ok(state)
                    } else {
                        deps.api.debug("Shame on you for trying to trick the system, you're not getting your money back");
                        Ok(state)
                    }
                })?;
            }
        }
    }
    Ok(res)
}


#[entry_point]
pub fn query(deps: Deps, env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetContracts {} => to_binary(&query_contracts(deps)?),
        QueryMsg::WithPermit { permit, query } => permit_queries(deps, env, permit, query),
    }
}

fn permit_queries(
    deps: Deps,
    env: Env,
    permit: Permit,
    query: QueryWithPermit,
) -> Result<Binary, StdError> {
    // Validate permit content
    let token_address = env.contract.address.clone();

    let account = secret_toolkit::permit::validate(
        deps,
        "revoked_permits",
        &permit,
        token_address.into_string(),
        None,
    )?;

    match query {
        QueryWithPermit::ChannelInfo { channels, txhash } => query_channel_info(
            deps,
            env,
            channels,
            txhash,
            deps.api.addr_canonicalize(account.as_str())?,
        ),
    }
}

fn query_contracts(deps: Deps) -> StdResult<ContractsResponse> {
    let state = config_read(deps.storage).load()?;
    let client_contracts: Vec<ClientContract> = state.contracts.into_iter().map(ClientContract::from).collect();
    Ok(ContractsResponse { contracts: client_contracts })
}

///
/// ChannelInfo query
///
///   Authenticated query allows clients to obtain the seed,
///   and Notification ID of an event for a specific tx_hash, for a specific channel.
///
fn query_channel_info(
    deps: Deps,
    env: Env,
    channels: Vec<String>,
    txhash: Option<String>,
    sender_raw: CanonicalAddr,
) -> StdResult<Binary> {
    let secret = SNIP52_INTERNAL_SECRET.load(deps.storage)?;
    let secret = secret.as_slice();
    let seed = get_seed(&sender_raw, secret)?;
    let mut channels_data = vec![];
    for channel in channels {
        let answer_id;
        if let Some(tx_hash) = &txhash {
            answer_id = Some(notification_id(&seed, &channel, tx_hash)?);
        } else {
            answer_id = None;
        }
        match channel.as_str() {
            AcceptedNotificationData::CHANNEL_ID => {
                let channel_info_data = ChannelInfoData {
                    mode: "txhash".to_string(),
                    channel,
                    answer_id,
                    parameters: None,
                    data: None,
                    next_id: None,
                    counter: None,
                    cddl: Some(AcceptedNotificationData::CDDL_SCHEMA.to_string()),
                };
                channels_data.push(channel_info_data);
            }
            _ => {
                return Err(StdError::generic_err(format!(
                    "`{}` channel is undefined",
                    channel
                )));
            }
        }
    }

    to_binary(&QueryAnswer::ChannelInfo {
        as_of_block: Uint64::from(env.block.height),
        channels: channels_data,
        seed,
    })
}