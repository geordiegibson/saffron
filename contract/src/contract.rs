
use cosmwasm_std::{from_binary, Addr, Uint128};
use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdError, StdResult,
};

use crate::msg::{ContractsResponse, ExecuteMsg, ExecuteReceiveMsg, InstantiateMsg, QueryMsg};
use crate::state::{config, config_read, State, Contract};
use secret_toolkit::snip20::register_receive_msg;

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

    if let Some(msg) = msg {
        match from_binary(&msg)? {

            ExecuteReceiveMsg::Create { requesting_coin, requesting_amount } => {
                deps.api.debug("Received Create Request");

                config(deps.storage).update::<_, StdError>(|mut state| {
                    let contract = Contract {
                        id: state.current_contract_id.to_string(),
                        giving_coin: "SCRT".to_string(), 
                        giving_amount: amount,
                        receiving_coin: requesting_coin,
                        receiving_amount: requesting_amount,
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
                    state.contracts.retain(|contract| contract.id != id);
                    Ok(state)
                })?;
            }
        }
    }
    Ok(Response::default())
}

#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetContracts {} => to_binary(&query_contracts(deps)?),
    }
}

fn query_contracts(deps: Deps) -> StdResult<ContractsResponse> {
    let state = config_read(deps.storage).load()?;
    Ok(ContractsResponse { contracts: state.contracts })
}