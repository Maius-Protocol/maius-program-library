use anchor_lang::prelude::*;
use anchor_spl::token::{Mint};

pub const ACCEPTED_TOKENS_PREFIX: &'static str = "accepted_tokens";
// Note: Amount of crypto/USD price supporting by Pyth
// https://pyth.network/developers/price-feed-ids/#solana-mainnet-beta
pub const MAXIMUM_ACCEPTED_TOKENS_PER_PRICE: usize = 56;

#[account]
#[derive(Default)]
pub struct AcceptedTokens {
    pub tokens: Vec<Mint>,
}

impl AcceptedTokens {
    pub fn space() -> usize {
        8 +  // discriminator
        4 + MAXIMUM_ACCEPTED_TOKENS_PER_PRICE*4 + MAXIMUM_ACCEPTED_TOKENS_PER_PRICE*Mint::LEN // tokens
    }
}