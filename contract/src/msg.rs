use crate::state::{Activity, ClientContract, Message};
use cosmwasm_std::{Addr, Binary, Uint128, Uint64};
use schemars::JsonSchema;
use secret_toolkit::{notification::ChannelInfoData, permit::Permit};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct InstantiateMsg {}

// Defines all possilbe state modifying requests.
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    Receive {
        sender: Addr,
        from: Addr,
        amount: Uint128,
        msg: Option<Binary>,
    },
    ReceiveNft {
        sender: Addr,
        token_id: String,
        msg: Option<Binary>,
    },
    AddMessage {
        message: String,
    },
}

// Defines the types of messages that come back from the RegisterReceive callbacks (when the contract takes ownership of currency).
// These indicate whether someone is sending us money to create a contract, or fullfill another users contract.
#[derive(Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteReceiveMsg {
    Create {
        wanting_coin_addr: String,
        wanting_amount: Uint128,
    },
    CreateNft {
        wanting_coin_addr: String,
        wanting_amount: Uint128,
        token_url: String,
    },
    Accept {
        id: String,
    },
}

// Defines all possilbe non-modifying requests.
#[derive(Serialize, Deserialize, Clone, Debug, JsonSchema)]
#[cfg_attr(test, derive(Eq, PartialEq))]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    GetContracts {},
    GetActivity {
        user_address: String,
    },
    GetAllMessages {},
    WithPermit {
        permit: Permit,
        query: QueryWithPermit,
    },
}

// SNIP-52 Private Push Notifications. Used to authenticate users on non-modifying queries.
#[derive(Serialize, Deserialize, Clone, Debug, JsonSchema)]
#[cfg_attr(test, derive(Eq, PartialEq))]
#[serde(rename_all = "snake_case")]
pub enum QueryWithPermit {
    ChannelInfo {
        channels: Vec<String>,
        txhash: Option<String>,
    },
}

// SNIP-52
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

// Sending back the list of all available contracts.
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct ContractsResponse {
    pub contracts: Vec<ClientContract>,
}

// Sending back a list of users recent activities.
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct ActivityResponse {
    pub activity: Vec<Activity>,
}

// Sending back a list of all global messages
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct MessagesResponse {
    pub messages: Vec<Message>,
}
