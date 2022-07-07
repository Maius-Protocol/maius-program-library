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
    // FYI: https://github.com/coral-xyz/anchor/blob/master/lang/syn/src/codegen/program/handlers.rs#L98
    pub fn space(description: &str) -> usize {
        8 +  // discriminator
        1 + // bump
        PUBKEY_SIZE + // authority
        4 + // Vec len
        description.len() // description
    }
}