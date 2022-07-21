use anchor_lang::prelude::*;
use crate::PUBKEY_SIZE;

pub const SUBSCRIPTION_ITEM_PREFIX: &'static str = "subscription_item";

#[account]
#[derive(Default)]
pub struct SubscriptionItem {
    pub price: Pubkey,
    pub billing_thresholds: u64,
    pub created: i64,
    pub quantity: u8,
}

impl SubscriptionItem {
    pub fn space() -> usize {
        8  + // discriminator
        PUBKEY_SIZE + // price
        8 + // billing_thresholds
        8 + // created
        1 // quantity
    }
}