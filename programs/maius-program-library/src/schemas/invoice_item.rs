use anchor_lang::prelude::*;
use crate::PUBKEY_SIZE;

pub const INVOICE_ITEM_PREFIX: &'static str = "invoice_item";

#[account]
#[derive(Default)]
pub struct InvoiceItem {
    pub cus: Pubkey,
    pub last_invoice: Pubkey,
    pub created: i64,
    pub status: String,
    pub subscription_item_count: u8
}

impl InvoiceItem {
    pub fn space() -> usize {
        8  + // discriminator
            PUBKEY_SIZE + // merchant_wallet
            PUBKEY_SIZE + // customer_wallet
            PUBKEY_SIZE + // last_invoice
            8 + // created
            1 // subscription_item_count
    }
}