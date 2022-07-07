// use anchor_lang::prelude::*;

// #[account]
// pub struct Subscription {
//     pub merchant_wallet: Pubkey,
//     pub customer_wallet: Pubkey,
//     pub last_invoice: Pubkey,
//     pub subscription_id: String,
// }

// impl Subscription {
//     pub fn space(subscription_id: &str) -> usize {
//             32 + // merchant_wallet
//             32 + // customer_wallet
//             32 + // last_invoice
//             4 + subscription_id.len() // subscription_id
//     }
// }