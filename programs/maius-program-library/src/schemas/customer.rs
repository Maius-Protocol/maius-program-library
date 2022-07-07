use anchor_lang::prelude::*;
use crate::constants::*;

#[account]
#[derive(Default)]
pub struct Customer {
    pub bump: u8,
    pub authority: Pubkey,
    pub description: String,
}

impl Customer {
    pub fn space(description: &str) -> usize {
        8 +  // discriminator
        1 + // bump
        PUBKEY_SIZE + // authority
        description.len() // description
    }
}