use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    mint,
    token::{self, Mint, Token, TokenAccount},
};
use crate::schemas::*;

#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct InitializeEscrowAccount<'info> {
    #[account(mut)]
    pub customer: Signer<'info>,
    /// CHECK
    pub merchant: AccountInfo<'info>,
    pub mint: Account<'info, Mint>,
    #[account(
        init,
        seeds = [
            b"v1",
            ESCROW_ACCOUNT_PREFIX.as_bytes(),
            invoice_account.key().as_ref()
        ],
        bump,
        payer = customer,
        token::mint = mint,
        token::authority = customer,
        constraint = amount > 0,
    )]
    pub vault_account: Account<'info, TokenAccount>,
    #[account(
    mut,
    constraint = customer_deposit_token_account.amount >= amount
    )]
    pub customer_deposit_token_account: Account<'info, TokenAccount>,
    pub merchant_receive_token_account: Account<'info, TokenAccount>,
    #[account(
        zero
    )]
    pub escrow_account: Account<'info, EscrowAccount>,
    #[account(mut)]
    pub invoice_account: Account<'info, Invoice>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
    pub token_program: Program<'info, Token>,
}

pub fn handler(
    ctx: Context<InitializeEscrowAccount>,
) ->  Result<()> {
    Ok(())
}