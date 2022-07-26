use anchor_lang::prelude::*;
use crate::PUBKEY_SIZE;

pub const INVOICE_ITEM_PREFIX: &'static str = "invoice_item";

#[account]
#[derive(Default)]
pub struct InvoiceItem {
    pub amount: u64,
    pub customer_account: Pubkey,
    pub price: Pubkey,
    pub quantity: u64,
}

impl InvoiceItem {
    pub fn space() -> usize {
        8  + // discriminator
        8  + // amount
        PUBKEY_SIZE + // customer_account
        PUBKEY_SIZE + // price
        8  // quantity
    }
}