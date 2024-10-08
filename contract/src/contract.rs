
use cosmwasm_std::{from_binary, Addr, Uint128};
use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdError, StdResult,
};

use crate::msg::{ContractsResponse, ExecuteMsg, ExecuteReceiveMsg, InstantiateMsg, QueryMsg};
use crate::state::{config, config_read, ClientContract, Contract, State};
use secret_toolkit::snip20::{register_receive_msg, transfer_msg};

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

    Ok(Response::new()
        .add_message(register_msg)
    )
}

#[entry_point]
pub fn execute(deps: DepsMut, env: Env, info: MessageInfo, msg: ExecuteMsg) -> StdResult<Response> {
    match msg {
        ExecuteMsg::Receive { sender, from, amount, msg } => try_receive(deps, info, sender, from, amount, msg),
    }
}

pub fn try_receive(deps: DepsMut, info: MessageInfo, sender: Addr, from: Addr, amount: Uint128, msg: Option<Binary>) -> StdResult<Response> {
    
    deps.api.debug("callback called");

    let mut res = Response::default();

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

                        res = Response::default().add_message(intial_transfer_message).add_message(acceptance_transfer_message);
                        
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
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetContracts {} => to_binary(&query_contracts(deps)?),
    }
}

fn query_contracts(deps: Deps) -> StdResult<ContractsResponse> {
    let state = config_read(deps.storage).load()?;
    let client_contracts: Vec<ClientContract> = state.contracts.into_iter().map(ClientContract::from).collect();
    Ok(ContractsResponse { contracts: client_contracts })
}