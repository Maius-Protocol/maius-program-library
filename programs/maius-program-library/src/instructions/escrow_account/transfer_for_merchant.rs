use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    mint,
    token::{self, Mint, Token, TokenAccount, Transfer, SetAuthority},
};
use crate::schemas::*;

#[derive(Accounts)]
pub struct TransferForMerchant<'info> {
    #[account(mut)]
    pub merchant: Signer<'info>,
    #[account(mut)]
    pub merchant_receive_token_account: Account<'info, TokenAccount>,
    // #[account(mut)]
    // pub escrow_account: Box<Account<'info, EscrowAccount>>,
    #[account(
    mut,
    seeds = [
    b"v1",
    b"token-seed".as_ref(),
    invoice_account.key().as_ref()
    ],
    bump,
    )]
    pub vault_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub invoice_account: Account<'info, Invoice>,
    pub token_program: Program<'info, Token>,
}

pub fn handler(
    ctx: Context<TransferForMerchant>,
    amount: u64,
) ->  Result<()> {
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_accounts = Transfer {
        from: ctx.accounts.vault_account.to_account_info(),
        to: ctx.accounts.merchant_receive_token_account.to_account_info(),
        authority: ctx.accounts.vault_account.to_account_info(),
    };


    token::transfer(
        CpiContext::new_with_signer(
            cpi_program,
            cpi_accounts,
            &[&[b"v1", b"token-seed".as_ref(), ctx.accounts.invoice_account.key().as_ref(), &[*ctx.bumps.get("vault_account").unwrap()]]]),
        amount)?;

    Ok(())
}
