// use anchor_lang::prelude::*;
// use crate::PUBKEY_SIZE;
//
// pub const INVOICE_PREFIX: &'static str = "invoice";
//
// #[account]
// #[derive(Default)]
// pub struct Invoice {
//     pub customer_wallet: Pubkey,
//     pub last_invoice: Pubkey,
//     pub created: i64,
//     pub status: String,
//     pub subscription_item_count: u8
// }
//
// impl Invoice {
//     pub fn space() -> usize {
//         8  + // discriminator
//             PUBKEY_SIZE + // merchant_wallet
//             PUBKEY_SIZE + // customer_wallet
//             PUBKEY_SIZE + // last_invoice
//             8 + // created
//             1 // subscription_item_count
//     }
// }