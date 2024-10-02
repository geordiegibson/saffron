use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdError, StdResult,
};

use crate::msg::{ExecuteMsg, InstantiateMsg, MessagesResponse, QueryMsg};
use crate::state::{config, config_read, Message, State};

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    let state = State { messages: vec![] };

    deps.api.debug(format!("Contract was initialized").as_str());
    config(deps.storage).save(&state)?;

    Ok(Response::default())
}

#[entry_point]
pub fn execute(deps: DepsMut, env: Env, info: MessageInfo, msg: ExecuteMsg) -> StdResult<Response> {
    match msg {
        ExecuteMsg::AddMessage { message } => try_add_message(deps, info, message),
    }
}

// User creates a new trade request
pub fn try_add_message(deps: DepsMut, info: MessageInfo, message: String) -> StdResult<Response> {
    config(deps.storage).update(|mut state| -> Result<_, StdError> {
        let message = Message {
            message,
            sender: info.sender,
        };
        state.messages.push(message);
        Ok(state)
    })?;

    deps.api.debug("Message added successfully");
    Ok(Response::default())
}

#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetAllMessages {} => to_binary(&query_messages(deps)?),
    }
}

fn query_messages(deps: Deps) -> StdResult<MessagesResponse> {
    let state = config_read(deps.storage).load()?;
    Ok(MessagesResponse {
        messages: state.messages,
    })
}
