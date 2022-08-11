use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    mint,
    token::{self, Mint, Token, TokenAccount, Transfer, SetAuthority},
};
use crate::schemas::*;


#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct InitializeEscrowAccount<'info> {
    #[account(mut)]
    pub customer: Signer<'info>,
    /// CHECK
    pub merchant: AccountInfo<'info>,
    /// CHECK
    pub judge: AccountInfo<'info>,
    pub mint: Account<'info, Mint>,
    #[account(
        init,
        seeds = [
            b"v1",
            b"token-seed".as_ref(),
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
        init,
        seeds = [
        b"v1",
        b"escrow-account".as_ref(),
        invoice_account.key().as_ref()
        ],
        bump,
        space = EscrowAccount::space(),
        payer = customer,
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
    amount: u64,
) ->  Result<()> {
    ctx.accounts.escrow_account.customer = *ctx.accounts.customer.key;
    ctx.accounts.escrow_account.merchant = *ctx.accounts.merchant.key;
    ctx.accounts.escrow_account.judge = *ctx.accounts.judge.key;
    ctx.accounts.escrow_account.customer_deposit_token_account = ctx.accounts.customer_deposit_token_account.key();
    ctx.accounts.escrow_account.merchant_receive_token_account = ctx.accounts.merchant_receive_token_account.key();
    ctx.accounts.escrow_account.amount = amount;
    ctx.accounts.escrow_account.invoice_account = ctx.accounts.invoice_account.key();
    ctx.accounts.escrow_account.status = 0;

    // Transfer token to PDA
    token::transfer(
        ctx.accounts.into_transfer_to_pda_context(),
        ctx.accounts.escrow_account.amount,
    )?;

    Ok(())
}

impl<'info> InitializeEscrowAccount<'info> {
    fn into_transfer_to_pda_context(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        let cpi_accounts = Transfer {
            from: self.customer_deposit_token_account.to_account_info().clone(),
            to: self.vault_account.to_account_info().clone(),
            authority: self.customer.to_account_info(),
        };
        CpiContext::new(self.token_program.to_account_info(), cpi_accounts)
    }

    fn into_set_authority_context(&self) -> CpiContext<'_, '_, '_, 'info, SetAuthority<'info>> {
        let cpi_accounts = SetAuthority {
            account_or_mint: self.vault_account.to_account_info().clone(),
            current_authority: self.customer.to_account_info(),
        };
        CpiContext::new(self.token_program.to_account_info(), cpi_accounts)
    }
}
