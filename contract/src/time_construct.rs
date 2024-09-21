use cosmwasm_std::Timestamp;
// Function to create a new struct from an integer input

pub struct ExtendedTimestamp(Timestamp);

impl ExtendedTimestamp {
    pub fn new(nanos: u64) -> Self {
        ExtendedTimestamp(Timestamp::from_nanos(nanos))
    }

    pub fn plus_hours(&self, addition: u64) -> Timestamp {
        self.0.plus_seconds(addition * 3600) // 1 hour = 3600 seconds
    }

    // You can also delegate existing methods if needed
    pub fn timestamp(&self) -> &Timestamp {
        &self.0
    }
}

pub fn is_valid_duration(hours: i32) -> bool {
    match hours {
        3 | 12 | 24 | 72 | 168 | 336 => true, // Return true for valid durations
        _ => false, // Return false for invalid durations
    }
}

pub fn get_expiry_time(additional_time: i32, current_time: Timestamp) -> String {
    let nanos = current_time.nanos();
    let ts = ExtendedTimestamp::new(nanos);
    let expiration = ts.plus_hours(additional_time.try_into().unwrap());
    expiration.to_string()
}
