use anchor_lang::prelude::*;
use crate::PUBKEY_SIZE;

pub const ESCROW_ACCOUNT_PREFIX: &'static str = "escrow_account";
pub const MAXIMUM_LENGTH_OF_STATUS :usize = 36;

#[account]
#[derive(Default)]
pub struct EscrowAccount {
    pub customer: Pubkey,
    pub merchant: Pubkey,
    pub customer_deposit_token_account: Pubkey,
    pub merchant_receive_token_account: Pubkey,
    // pub customer_account: Pubkey,
    // pub merchant_account: Pubkey,
    pub invoice_account: Pubkey,
    pub amount: u64,
    /** status
           0: New
           1: Shipping
           2: Delivered
     */
    pub status: u8
}

impl EscrowAccount {
    pub fn space() -> usize {
        8  + // discriminator
            PUBKEY_SIZE + // customer
            PUBKEY_SIZE + // merchant
            PUBKEY_SIZE + // customer_deposit_token_account
            PUBKEY_SIZE + // merchant_receive_token_account
            // PUBKEY_SIZE + // customer_account
            // PUBKEY_SIZE + // merchant_account
            PUBKEY_SIZE + // invoice_account
            8  + // amount
            1 // status

    }
}