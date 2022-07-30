use anchor_lang::prelude::*;
use crate::constants::*;

pub const PRICE_PREFIX: &'static str = "price";
pub const BILLING_SCHEME_MAX_LEN: usize = 128;
pub const CURRENCY_MAX_LEN: usize = 16;
pub const INTERVAL_MAX_LEN: usize = 64;
pub const INTERVAL_COUNT_MAX_LEN: usize = 31;
pub const UNIT_AMOUNT_MAX_LEN: usize = 8;
pub const PRICE_TYPE_MAX_LEN: usize = 256;
pub const CREATED_MAX_LEN: usize = 8;
pub const UPDATED_MAX_LEN: usize = 8;
// Note: Amount of crypto/USD price supporting by Pyth
// https://pyth.network/developers/price-feed-ids/#solana-mainnet-beta
pub const MAXIMUM_ACCEPTED_TOKENS_PER_PRICE: usize = 56;

#[account]
#[derive(Default)]
pub struct Price {
    pub authority: Pubkey,
    pub product: Pubkey,
    pub billing_scheme: String,
    pub currency: String,
    pub unit_amount: u64,
    pub interval: String,
    pub interval_count: u8,
    pub active: bool,
    pub price_type: String,
    pub accepted_tokens: Vec<Pubkey>,
    pub created: i64,
    pub updated: i64,
}

impl Price {
    // FYI: https://github.com/coral-xyz/anchor/blob/master/lang/syn/src/codegen/program/handlers.rs#L98
    pub fn space() -> usize {
        8 +  // discriminator
        PUBKEY_SIZE + // product
        4 + BILLING_SCHEME_MAX_LEN + // billing_scheme
        4 + CURRENCY_MAX_LEN + // currency 
        UNIT_AMOUNT_MAX_LEN + // unit_amount
        4 + INTERVAL_MAX_LEN + // interval
        INTERVAL_COUNT_MAX_LEN + // interval_count
        1 + // active
        4 + PRICE_TYPE_MAX_LEN + // price_type
        4 + MAXIMUM_ACCEPTED_TOKENS_PER_PRICE*4 + MAXIMUM_ACCEPTED_TOKENS_PER_PRICE*PUBKEY_SIZE + // accepted_tokens
        CREATED_MAX_LEN + // created
        UPDATED_MAX_LEN  // updated
    }
}