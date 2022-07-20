use anchor_lang::prelude::*;
use crate::PUBKEY_SIZE;

pub const SUBSCRIPTION_PREFIX: &'static str = "subscription";
pub const MAXIMUM_LENGTH_OF_STATUS :usize = 36;

#[account]
#[derive(Default)]
pub struct Subscription {
    pub merchant_wallet: Pubkey,
    pub customer_wallet: Pubkey,
    pub last_invoice: Pubkey,
    pub created: i64,
    pub status: String,
    pub subscription_item_count: u8
}

impl Subscription {
    pub fn space() -> usize {
            8  + // discriminator
            PUBKEY_SIZE + // merchant_wallet
            PUBKEY_SIZE + // customer_wallet
            PUBKEY_SIZE + // last_invoice
            8 + // created
            4 + MAXIMUM_LENGTH_OF_STATUS + // status
            1 + // subscription_item_count
            8 // subscription_item_count
    }
}