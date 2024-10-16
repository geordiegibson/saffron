use std::str::FromStr;

use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdError, StdResult,
};
use cosmwasm_std::{from_binary, Addr, CanonicalAddr, Uint128, Uint64};
use secret_toolkit::crypto::{hkdf_sha_256, sha_256, ContractPrng};
use secret_toolkit::notification::{
    get_seed, notification_id, ChannelInfoData, Notification, NotificationData,
};
use secret_toolkit::permit::Permit;

use crate::msg::{
    ActivityResponse, ContractsResponse, ExecuteMsg, ExecuteReceiveMsg, InstantiateMsg,
    MessagesResponse, QueryAnswer, QueryMsg, QueryWithPermit,
};
use crate::notify::AcceptedNotificationData;
use crate::state::{
    config, Activity, ActivityStore, ClientContract, Contract, Message, State,
    ACTIVE_CONTRACTS_KEYMAP, EXPIRED_CONTRACTS_KEYMAP, MESSAGES_APPENDSTORE,
    SNIP52_INTERNAL_SECRET, USER_ACTIVITIES_APPENDSTORE,
};
use secret_toolkit::snip20::{register_receive_msg, transfer_msg};
use secret_toolkit::snip721::{register_receive_nft_msg, transfer_nft_msg};

pub const SEED_LEN: usize = 32;

// Called when the contract is instantiated. Registers callbacks for when we receive coins / NFTS.
#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    _msg: InstantiateMsg,
) -> StdResult<Response> {
    let state = State {
        current_contract_id: Uint128::new(0),
        owner: info.sender.clone(),
    };

    config(deps.storage).save(&state)?;

    let coin_hash = "38ca273d3602a4bdafc25080a049f25e8a00ca8144a8c526241e8cb2e8f0baf5";
    let scrt_addr = "secret14ndaswjg2cntwe24rn5rthy7eaqqm0d7k6vaus";
    let eth_addr = "secret1ayp9q4glfgly37eavy00ft7tx3v8a6u57rkrtm";
    let shd_addr = "secret1uaww4sj23lrq823a7c54akzsw9fue73ujwtl5d";
    let nft_hash = "773c39a4b75d87c4d04b6cfe16d32cd5136271447e231b342f7467177c363ca8";
    let nft_addr = "secret16x48pd4j9sprs6fdqmpka7ld7sjvy4qdqj2hsz";

    // Register for SNIP-20 callback - Coin 1
    let register_msg1 = register_receive_msg(
        env.contract.code_hash.clone(),
        None,
        256,
        coin_hash.to_string(),
        scrt_addr.to_string(),
    )?;

    // Register for SNIP-20 callback - Coin 2
    let register_msg2 = register_receive_msg(
        env.contract.code_hash.clone(),
        None,
        256,
        coin_hash.to_string(),
        eth_addr.to_string(),
    )?;

    // Register for SNIP-20 callback - Coin 3
    let register_msg3 = register_receive_msg(
        env.contract.code_hash.clone(),
        None,
        256,
        coin_hash.to_string(),
        shd_addr.to_string(),
    )?;

    // Register for SNIP-721 callback
    let register_nft_msg = register_receive_nft_msg(
        env.contract.code_hash.clone(),
        None,
        None,
        256,
        nft_hash.to_string(),
        nft_addr.to_string(),
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
        .add_message(register_msg1)
        .add_message(register_msg2)
        .add_message(register_msg3)
        .add_message(register_nft_msg))
}

// State modifying requests.
#[entry_point]
pub fn execute(deps: DepsMut, env: Env, info: MessageInfo, msg: ExecuteMsg) -> StdResult<Response> {
    match msg {
        ExecuteMsg::Receive {
            sender,
            from,
            amount,
            msg,
        } => try_receive(deps, env, info, sender, from, amount, msg),
        ExecuteMsg::ReceiveNft {
            sender,
            token_id,
            msg,
        } => try_receive_nft(deps, env, info, sender, token_id, msg),
        ExecuteMsg::AddMessage { message } => try_add_message(deps, info, message),
    }
}

// Called when this contract address recieves a coin.
pub fn try_receive(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    sender: Addr,
    _from: Addr,
    amount: Uint128,
    msg: Option<Binary>,
) -> StdResult<Response> {
    let mut res = Response::default();
    let secret = SNIP52_INTERNAL_SECRET.load(deps.storage)?;
    let secret = secret.as_slice();

    if let Some(msg) = msg {
        match from_binary(&msg)? {
            // If the received message from the RegisterReceive callback contains
            ExecuteReceiveMsg::Create {
                wanting_coin_addr,
                wanting_amount,
            } => {
                create_contract(
                    deps,
                    &sender.to_string(),
                    wanting_coin_addr,
                    wanting_amount,
                    None, // No token_id for coin trade
                    None, // No token_url for coin trade
                    Some(info.sender.to_string()),
                    Some(amount),
                )?;
            }

            // In the event of a user accepting another users trade, the received message from the RegisterReceive callback will
            // contain the id of the contract they are attempting to accept.
            ExecuteReceiveMsg::Accept { id } => {
                deps.api.debug("Valid Accept Request");

                let contract = ACTIVE_CONTRACTS_KEYMAP
                    .get(deps.storage, &Uint128::from_str(&id).unwrap())
                    .unwrap();

                // Ensure the sent money matches the requirements to fulfill the trade
                if contract.wanting_amount == amount
                    && contract.wanting_coin_addr == info.sender.to_string()
                {
                    // Add "Accept Activity" to accepters account
                    let user_act_store =
                        USER_ACTIVITIES_APPENDSTORE.add_suffix(sender.to_string().as_bytes());
                    let activity_store = ActivityStore {
                        contract_id: contract.id.clone(),
                        activity_type: 2,
                    };
                    let _ = user_act_store.push(deps.storage, &activity_store);

                    // Add "User Accepted Your Contract Activity" to original users account
                    let activity_store = ActivityStore {
                        contract_id: contract.id.clone(),
                        activity_type: 3,
                    };
                    let user_act_store =
                        USER_ACTIVITIES_APPENDSTORE.add_suffix(sender.to_string().as_bytes());
                    let _ = user_act_store.push(deps.storage, &activity_store);

                    // Send the original money / NFT to the user who accepted the contract.
                    let acceptance_transfer_message = if contract.offering_amount.is_some() {
                        transfer_msg(
                            sender.to_string(),
                            contract.offering_amount.clone().unwrap(),
                            None,
                            None,
                            256,
                            "38ca273d3602a4bdafc25080a049f25e8a00ca8144a8c526241e8cb2e8f0baf5"
                                .to_string(),
                            contract.offering_coin_addr.unwrap_or_default().to_string(),
                        )?
                    } else if contract.token_id.is_some() {
                        transfer_nft_msg(
                            sender.to_string(),
                            contract.token_id.clone().unwrap(),
                            None,
                            None,
                            256,
                            "773c39a4b75d87c4d04b6cfe16d32cd5136271447e231b342f7467177c363ca8"
                                .to_string(),
                            "secret16x48pd4j9sprs6fdqmpka7ld7sjvy4qdqj2hsz".to_string(),
                        )?
                    } else {
                        return Err(cosmwasm_std::StdError::generic_err(
                            "Missing transfer information",
                        ));
                    };

                    // Send the given money to the user who created the contract.
                    let intial_transfer_message = transfer_msg(
                        contract.user_wallet_address.to_string(),
                        contract.wanting_amount,
                        None,
                        None,
                        256,
                        "38ca273d3602a4bdafc25080a049f25e8a00ca8144a8c526241e8cb2e8f0baf5"
                            .to_string(),
                        contract.wanting_coin_addr.to_string(),
                    )?;

                    // SNIP-52 add `accepted` push notification
                    let notification = Notification::new(
                        Addr::unchecked(contract.user_wallet_address.clone()),
                        AcceptedNotificationData { id: id.clone() },
                    )
                    .to_txhash_notification(deps.api, &env, secret, None)?;

                    // Expire the contract
                    let contract = ACTIVE_CONTRACTS_KEYMAP
                        .get(deps.storage, &Uint128::from_str(&id).unwrap())
                        .unwrap();
                    let _ = ACTIVE_CONTRACTS_KEYMAP
                        .remove(deps.storage, &Uint128::from_str(&id).unwrap());
                    let _ = EXPIRED_CONTRACTS_KEYMAP.insert(deps.storage, &contract.id, &contract);

                    res = Response::default()
                        .add_message(intial_transfer_message)
                        .add_message(acceptance_transfer_message)
                        .add_attribute_plaintext(
                            notification.id_plaintext(),
                            notification.data_plaintext(),
                        );
                } else {
                    deps.api.debug("Shame on you for trying to trick the system, you're not getting your money back");
                }
            }
            _ => {}
        }
    }
    Ok(res)
}

// Called when this contract address recieves an NFT.
pub fn try_receive_nft(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    sender: Addr,
    token_id: String,
    msg: Option<Binary>,
) -> StdResult<Response> {
    let res = Response::default();
    if let Some(msg) = msg {
        match from_binary(&msg)? {
            ExecuteReceiveMsg::CreateNft {
                wanting_coin_addr,
                wanting_amount,
                token_url,
            } => {
                create_contract(
                    deps,
                    &sender.to_string(),
                    wanting_coin_addr,
                    wanting_amount,
                    Some(token_id),
                    Some(token_url),
                    None, // No offering_coin_addr for NFT trade
                    None, // No offering_amount for NFT trade
                )?;
            }

            _ => {
                deps.api
                    .debug("Recieved Call to NFT callback without the correct format");
            }
        }
    }
    Ok(res)
}

// Creates a trade item that will display to allow users.
fn create_contract(
    deps: DepsMut, // Accept as mutable
    sender: &str,
    wanting_coin_addr: String,
    wanting_amount: Uint128,
    token_id: Option<String>,           // Optional for NFT trades
    token_url: Option<String>,          // Optional for NFT trades
    offering_coin_addr: Option<String>, // Optional for coin trades
    offering_amount: Option<Uint128>,   // Optional for coin trades
) -> Result<(), StdError> {
    deps.api.debug("Creating Contract");

    // Add "Create Activity" to user's account
    let state = config(deps.storage).load()?;
    let user_act_store = USER_ACTIVITIES_APPENDSTORE.add_suffix(sender.as_bytes());
    let activity_store = ActivityStore {
        contract_id: state.current_contract_id.clone(),
        activity_type: 1,
    };
    let _ = user_act_store.push(deps.storage, &activity_store);

    let contract = Contract {
        id: state.current_contract_id,
        user_wallet_address: sender.to_string(),
        offering_coin_addr,
        offering_amount,
        wanting_coin_addr,
        wanting_amount,
        expiration: String::new(),
        token_id,
        token_url,
    };

    // Insert the new contract into active contracts
    config(deps.storage).update::<_, StdError>(|mut state| {
        state.current_contract_id = Uint128::new(state.current_contract_id.u128() + 1);
        Ok(state)
    })?;

    let _ = ACTIVE_CONTRACTS_KEYMAP.insert(deps.storage, &state.current_contract_id, &contract);

    Ok(())
}

// Non-modifying queries (no wallet attatched).
#[entry_point]
pub fn query(deps: Deps, env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetContracts {} => to_binary(&query_contracts(deps)?),
        QueryMsg::GetAllMessages {} => to_binary(&query_messages(deps)?),
        QueryMsg::GetActivity { user_address } => to_binary(&query_activity(deps, user_address)?),
        QueryMsg::WithPermit { permit, query } => permit_queries(deps, env, permit, query),
    }
}

// Returns a list of all sent messages
fn query_messages(deps: Deps) -> StdResult<MessagesResponse> {
    let mut messages: Vec<Message> = vec![];

    let len = MESSAGES_APPENDSTORE.get_len(deps.storage)?;
    // Get the last 20 messages
    let start = if len > 20 { len - 5 } else { 0 };

    for pos in start..len {
        let message = MESSAGES_APPENDSTORE.get_at(deps.storage, pos)?;
        messages.push(message);
    }

    Ok(MessagesResponse { messages: messages })
}

// Called when a user is attempting to send a message
pub fn try_add_message(deps: DepsMut, info: MessageInfo, message: String) -> StdResult<Response> {
    let message = Message {
        message,
        sender: info.sender,
    };
    let _ = MESSAGES_APPENDSTORE.push(deps.storage, &message);

    deps.api.debug("Message added successfully");
    Ok(Response::default())
}

// Used for SNIP-52 to authenticate users on query requests.
fn permit_queries(
    deps: Deps,
    env: Env,
    permit: Permit,
    query: QueryWithPermit,
) -> Result<Binary, StdError> {
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

// Fetch all live contracts (trade items).
fn query_contracts(deps: Deps) -> StdResult<ContractsResponse> {
    let client_contracts: Vec<ClientContract> = ACTIVE_CONTRACTS_KEYMAP
        .iter(deps.storage)?
        .map(|item| {
            let (_, contract) = item?;
            Ok(ClientContract::from(contract))
        })
        .collect::<StdResult<Vec<ClientContract>>>()?;

    Ok(ContractsResponse {
        contracts: client_contracts,
    })
}

// Fetches the five most recent actions for a given user address (Future work would include making this authenticated).
fn query_activity(deps: Deps, user_address: String) -> StdResult<ActivityResponse> {
    let mut activities: Vec<Activity> = Vec::new();
    let appendstore_with_suffix = USER_ACTIVITIES_APPENDSTORE.add_suffix(user_address.as_bytes());
    let len = appendstore_with_suffix.get_len(deps.storage)?;
    let start = if len > 5 { len - 5 } else { 0 };
    deps.api.debug(&len.to_string());

    for pos in start..len {
        let activity_store = appendstore_with_suffix.get_at(deps.storage, pos)?;
        deps.api.debug(&pos.to_string());

        let contract = ACTIVE_CONTRACTS_KEYMAP.get(deps.storage, &activity_store.contract_id);
        deps.api.debug(&activity_store.contract_id.to_string());
        let contract = match contract {
            Some(contract) => Some(contract),
            None => EXPIRED_CONTRACTS_KEYMAP.get(deps.storage, &activity_store.contract_id),
        };

        if let Some(contract) = contract {
            let activity = Activity {
                activity_type: activity_store.activity_type,
                contract: contract.into(),
            };

            activities.push(activity);
        }

        if activities.len() == 5 {
            break;
        }
    }
    Ok(ActivityResponse {
        activity: activities,
    })
}

/// ChannelInfo query
///
/// Authenticated query allows clients to obtain the seed,
/// and Notification ID of an event for a specific tx_hash, for a specific channel.
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
