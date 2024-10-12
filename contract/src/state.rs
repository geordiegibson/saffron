use schemars::JsonSchema;
use secret_toolkit::storage::Item;
use secret_toolkit_storage::Keymap;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{Addr, Storage, Uint128};
use cosmwasm_storage::{singleton, singleton_read, ReadonlySingleton, Singleton};

pub static CONFIG_KEY: &[u8] = b"config";

// Complete contract details stored on the server.
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct Contract {
    pub id: Uint128,
    pub user_wallet_address: String,
    pub offering_coin_addr: String,
    pub offering_amount: Uint128,
    pub wanting_coin_addr: String,
    pub wanting_amount: Uint128,
    pub expiration: String
}

// Client representation of a contract. user_wallet_address field removed to keep contracts anonymous.
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct ClientContract {
    pub id: Uint128,
    pub offering_coin_addr: String,
    pub offering_amount: Uint128,
    pub wanting_coin_addr: String,
    pub wanting_amount: Uint128,
    pub expiration: String
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
        }
    }
}

impl From<&Contract> for ClientContract {
    fn from(contract: &Contract) -> Self {
        ClientContract {
            id: contract.id.clone(),
            offering_coin_addr: contract.offering_coin_addr.clone(),
            offering_amount: contract.offering_amount,
            wanting_coin_addr: contract.wanting_coin_addr.clone(),
            wanting_amount: contract.wanting_amount,
            expiration: contract.expiration.clone(),
        }
    }
}

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

pub static SNIP52_INTERNAL_SECRET: Item<Vec<u8>> = Item::new(b"snip52-secret");

pub static ACTIVE_CONTRACTS_KEYMAP: Keymap<Uint128, Contract> = Keymap::new(b"active_contracts");
pub static EXPIRED_CONTRACTS_KEYMAP: Keymap<Uint128, Contract> = Keymap::new(b"expired_contracts");

pub static USER_ACTIVITIES_KEYMAP: Keymap<Uint128, u32> = Keymap::new(b"user_activities");

