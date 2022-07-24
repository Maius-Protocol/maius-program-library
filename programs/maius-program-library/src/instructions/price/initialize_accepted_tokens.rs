use anchor_lang::prelude::*;
use crate::schemas::*;
use anchor_spl::token::{Mint};

#[derive(Accounts)]
#[instruction(tokens: Vec<Mint>)]
pub struct InitializeAcceptedTokens<'info> {
    #[account(
        init_if_needed,
        seeds = [
            b"v1",
            AcceptedTokens::ACCEPTED_TOKENS_PREFIX.as_bytes(),
            merchant_authority.key().as_ref(),
        ],
        bump,
        payer = merchant_authority,
        space = AcceptedTokens::space()
    )]
    pub accepted_tokens_account: Account<'info, AcceptedTokens>,
    pub system_program: Program<'info, System>,
    #[account(mut)]
    pub merchant_authority: Signer<'info>,
}

pub fn handler(
    ctx: Context<InitializeAcceptedTokens>,
    tokens: Vec<Mint>,
) -> Result<()> {
    
    ctx.accounts.accepted_tokens_account.tokens = tokens;

    Ok(())
}