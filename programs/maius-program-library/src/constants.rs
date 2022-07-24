use anchor_lang::prelude::*;

pub const PUBKEY_SIZE: usize = std::mem::size_of::<Pubkey>();
pub const BOOL_SIZE: usize = std::mem::size_of::<bool>();
pub const I64_SIZE: usize = std::mem::size_of::<i64>();
pub const U64_SIZE: usize = std::mem::size_of::<u64>();
pub const MAXIMUM_IMAGES_PER_PRODUCT: i8 = 4;
pub const VERSION: i8 = 1;

pub const MAX_RESERVATIONS: usize = 200;
