use anchor_lang::prelude::*;

pub const SUBSCRIPTION_PREFIX: &'static str = "subscription";

#[account]
#[derive(Default)]
pub struct Subscription {
    pub merchant_wallet: Pubkey,
    pub customer_wallet: Pubkey,
    pub last_invoice: Pubkey,
    pub created: i64,
    pub subscription_item_count: u64,
}

impl Subscription {
    pub fn space() -> usize {
            8  + // discriminator
            32 + // merchant_wallet
            32 + // customer_wallet
            32 + // last_invoice
            8  + // created
            8 // subscription_item_count
    }
}