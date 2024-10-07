use cosmwasm_std::Timestamp;
// Function to create a new struct from an integer input
pub fn is_valid_duration(hours: u32) -> bool {
    match hours {
        3 | 12 | 24 | 72 | 168 | 336 => true, // Return true for valid durations
        _ => false, // Return false for invalid durations
    }
}

pub fn get_expiry_time(additional_time: u32, current_time: Timestamp) -> String {
    let ts = current_time.seconds();
    let expiration = ts + u64::from(additional_time * 3600);
    expiration.to_string()
}
