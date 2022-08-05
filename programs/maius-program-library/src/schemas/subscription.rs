use anchor_lang::prelude::*;
use crate::PUBKEY_SIZE;

pub const SUBSCRIPTION_PREFIX: &'static str = "subscription";
pub const MAXIMUM_LENGTH_OF_STATUS :usize = 36;

#[account]
#[derive(Default)]
pub struct Subscription {
    pub merchant: Pubkey,
    pub merchant_account: Pubkey,
    pub customer_account: Pubkey,
    pub last_invoice: Pubkey,
    pub cancel_at: i64,
    pub created: i64,
    pub current_period_end: i64,
    pub current_period_start: i64,
    pub status: String,
    pub subscription_item_count: u8
}

impl Subscription {
    pub fn space() -> usize {
            8  + // discriminator
            PUBKEY_SIZE + // merchant
            PUBKEY_SIZE + // merchant_account
            PUBKEY_SIZE + // customer_account
            PUBKEY_SIZE + // last_invoice
            8 + // cancel_at
            8 + // created
            8 + // current_period_end
            8 + // current_period_start
            4 + MAXIMUM_LENGTH_OF_STATUS + // status
            1 // subscription_item_count
    }
}