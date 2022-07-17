use anchor_lang::prelude::*;
use crate::constants::*;

#[account]
#[derive(Default)]
pub struct Price {
    pub product: Pubkey,
    pub billing_scheme: String,
    pub currency: String,
    pub unit_amount: u64,
    pub interval: String,
    pub interval_count: u8,
    pub active: bool,
    pub price_type: String,
    pub created: u64,
    pub updated: u64,
}

impl Price {
    pub const PRICE_PREFIX: &'static str = "price";
    pub const BILLING_SCHEME_MAX_LEN: usize = 128;
    pub const CURRENCY_MAX_LEN: usize = 16;
    pub const INTERVAL_MAX_LEN: usize = 64;
    pub const INTERVAL_COUNT_MAX_LEN: usize = 31;
    pub const UNIT_AMOUNT_MAX_LEN: usize = 8;
    pub const PRICE_TYPE_MAX_LEN: usize = 256;
    pub const CREATED_MAX_LEN: usize = 8;
    pub const UPDATED_MAX_LEN: usize = 8;

    // FYI: https://github.com/coral-xyz/anchor/blob/master/lang/syn/src/codegen/program/handlers.rs#L98
    pub fn space() -> usize {
        8 +  // discriminator
        PUBKEY_SIZE + // product
        4 + Price::BILLING_SCHEME_MAX_LEN + // billing_scheme
        4 + Price::CURRENCY_MAX_LEN + // currency 
        Price::UNIT_AMOUNT_MAX_LEN + // unit_amount
        4 + Price::INTERVAL_MAX_LEN + // interval
        Price::INTERVAL_COUNT_MAX_LEN + // interval_count
        1 + // active
        4 + Price::PRICE_TYPE_MAX_LEN + // price_type
        Price::CREATED_MAX_LEN + // created
        Price::UPDATED_MAX_LEN  // updated
    }
}