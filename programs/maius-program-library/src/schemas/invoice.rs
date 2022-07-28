use anchor_lang::prelude::*;
use crate::PUBKEY_SIZE;

pub const INVOICE_PREFIX: &'static str = "invoice";
pub const MAXIMUM_LENGTH_OF_STATUS :usize = 36;

#[account]
#[derive(Default)]
pub struct Invoice {
    pub customer_account: Pubkey,
    pub created: i64,
    pub invoice_item_count: u8,
    pub period_end: i64,
    pub period_start: i64,
    pub paid: bool,
    pub status: String,
    pub total: u64,
    pub subscription_account: Pubkey
}

impl Invoice {
    pub fn space() -> usize {
        8  + // discriminator
        PUBKEY_SIZE + // customer_account
        8 + // created_at
        1 + // invoice_item_count
        8 + // period_end
        8 + // period_start
        1 + // paid
        4 + MAXIMUM_LENGTH_OF_STATUS + // status
        8 + // total
        PUBKEY_SIZE // subscription_account
    }
}