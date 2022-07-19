use anchor_lang::prelude::*;

pub const SUBSCRIPTION_ITEM_PREFIX: &'static str = "subscription_item";

#[account]
#[derive(Default)]
pub struct SubscriptionItem {
    pub price: Pubkey,
    pub billing_thresholds_gte: u64,
}

impl SubscriptionItem {
    pub fn space() -> usize {
        8  + // discriminator
        32 + // merchant_wallet
        32 + // customer_wallet
        32 + // last_invoice
        8  + // created
        8 // subscription_item_count
    }
}