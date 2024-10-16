use cosmwasm_std::StdError;
use secret_toolkit::notification::NotificationData;
use minicbor_ser as cbor;
use serde::{Deserialize, Serialize};


// SNIP-52 Push Notifications
#[derive(Serialize, Debug, Deserialize, Clone)]
pub struct AcceptedNotificationData {
    pub id: String,
}

impl NotificationData for AcceptedNotificationData {
    const CHANNEL_ID: &'static str = "accepted";
    const CDDL_SCHEMA: &'static str = "accepted=[id:tstr]";
    fn to_cbor(&self, _api: &dyn cosmwasm_std::Api) -> cosmwasm_std::StdResult<Vec<u8>> {
        let my_data = cbor::to_vec(&(
            self.id.as_bytes(),
        ))
        .map_err(|e| StdError::generic_err(format!("{:?}", e)))?;
        Ok(my_data)
    }
}