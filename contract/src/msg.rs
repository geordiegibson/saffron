use cosmwasm_std::{Addr, Binary, Uint128, Uint64};
use schemars::JsonSchema;
use secret_toolkit::{notification::ChannelInfoData, permit::Permit};
use serde::{Deserialize, Serialize};
use crate::state::{ActivityType, ClientContract};

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

#[derive(Serialize, Deserialize, Clone, Debug, JsonSchema)]
#[cfg_attr(test, derive(Eq, PartialEq))]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    GetContracts {},
    GetActivity { user_address: String },
    WithPermit {
        permit: Permit,
        query: QueryWithPermit,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, JsonSchema)]
#[cfg_attr(test, derive(Eq, PartialEq))]
#[serde(rename_all = "snake_case")]
pub enum QueryWithPermit {
    // SNIP-52 Private Push Notifications
    ChannelInfo {
        channels: Vec<String>,
        txhash: Option<String>,
    },
}

#[derive(Serialize, Deserialize, JsonSchema, Debug)]
#[serde(rename_all = "snake_case")]
pub enum QueryAnswer {
    ChannelInfo {
        /// scopes validity of this response
        as_of_block: Uint64,
        /// shared secret in base64
        seed: Binary,
        channels: Vec<ChannelInfoData>,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct ContractsResponse {
    pub contracts: Vec<ClientContract>
}

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct ActivityResponse {
    pub activity: Vec<u32>
}