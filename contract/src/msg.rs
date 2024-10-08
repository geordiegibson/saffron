use cosmwasm_std::{Addr, Binary, Uint128};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use crate::state::ClientContract;

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct InstantiateMsg {}

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    Receive {
        sender: Addr,
        from: Addr,
        amount: Uint128,
        msg: Option<Binary>,
    }
}

#[derive(Serialize,Deserialize, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteReceiveMsg {
    Create {
        wanting_coin_addr: String,
        wanting_amount: Uint128,
    },
    Accept {
        id: String
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    GetContracts {},
}

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct ContractsResponse {
    pub contracts: Vec<ClientContract>
}
