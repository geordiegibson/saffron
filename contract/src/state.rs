use schemars::JsonSchema;
use secret_toolkit::storage::Item;
use secret_toolkit_storage::{AppendStore, Keymap};
use serde::{Deserialize, Serialize};

use cosmwasm_std::{Addr, Storage, Uint128};
use cosmwasm_storage::{singleton, singleton_read, ReadonlySingleton, Singleton};

pub static CONFIG_KEY: &[u8] = b"config";
pub static SNIP52_INTERNAL_SECRET: Item<Vec<u8>> = Item::new(b"snip52-secret");
pub static ACTIVE_CONTRACTS_KEYMAP: Keymap<Uint128, Contract> = Keymap::new(b"active_contracts");
pub static EXPIRED_CONTRACTS_KEYMAP: Keymap<Uint128, Contract> = Keymap::new(b"expired_contracts");
pub static USER_ACTIVITIES_APPENDSTORE: AppendStore<ActivityStore> =
    AppendStore::new(b"user_activities_store");
pub static MESSAGES_APPENDSTORE: AppendStore<Message> = AppendStore::new(b"messages_store");

// Messages
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct Message {
    pub message: String,
    pub sender: Addr,
}

// Complete contract details stored on the server.
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct Contract {
    pub id: Uint128,
    pub user_wallet_address: String,
    pub offering_coin_addr: Option<String>,
    pub offering_amount: Option<Uint128>,
    pub wanting_coin_addr: String,
    pub wanting_amount: Uint128,
    pub expiration: String,
    pub token_id: Option<String>,
    pub token_url: Option<String>,
}

// Client representation of a contract. user_wallet_address field removed to keep contracts anonymous.
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct ClientContract {
    pub id: Uint128,
    pub offering_coin_addr: Option<String>, // Make offering_coin_addr optional
    pub offering_amount: Option<Uint128>,   // Make offering_amount optional
    pub wanting_coin_addr: String,
    pub wanting_amount: Uint128,
    pub expiration: String,
    pub token_id: Option<String>,  // Optional token_id field
    pub token_url: Option<String>, // Optional token_url field
}

// Allows us to convert from Contract type to ClientContract type.
impl From<Contract> for ClientContract {
    fn from(contract: Contract) -> Self {
        ClientContract {
            id: contract.id,
            offering_coin_addr: contract.offering_coin_addr,
            offering_amount: contract.offering_amount,
            wanting_coin_addr: contract.wanting_coin_addr,
            wanting_amount: contract.wanting_amount,
            expiration: contract.expiration,
            token_id: contract.token_id,
            token_url: contract.token_url,
        }
    }
}

// Allows us to convert from Contract type to ClientContract type.
impl From<&Contract> for ClientContract {
    fn from(contract: &Contract) -> Self {
        ClientContract {
            id: contract.id.clone(),
            offering_coin_addr: contract.offering_coin_addr.clone(),
            offering_amount: contract.offering_amount,
            wanting_coin_addr: contract.wanting_coin_addr.clone(),
            wanting_amount: contract.wanting_amount,
            expiration: contract.expiration.clone(),
            token_id: contract.token_id.clone(),
            token_url: contract.token_url.clone(),
        }
    }
}

// A type used to indiciate the action a user has performed on a contract
// Eg. User 1 created contract A, User 2 accepted created A.
// Uses plain ints as Enums don't work in Secret storage types.
// 1 = Created, 2 = Accepted , 3 = User Accepted Your Contract.
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct ActivityStore {
    pub contract_id: Uint128,
    pub activity_type: u32,
}

// Client facing version of an Activity
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct Activity {
    pub activity_type: u32,
    pub contract: ClientContract,
}

// Global State. Contract Id used to associate unique ID's to contracts (trade items) as they are created by users.
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct State {
    pub owner: Addr,
    pub current_contract_id: Uint128,
}

pub fn config(storage: &mut dyn Storage) -> Singleton<State> {
    singleton(storage, CONFIG_KEY)
}

pub fn config_read(storage: &dyn Storage) -> ReadonlySingleton<State> {
    singleton_read(storage, CONFIG_KEY)
}
