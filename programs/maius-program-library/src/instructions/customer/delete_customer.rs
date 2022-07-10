use anchor_lang::prelude::*;
use crate::schemas::Customer;
use anchor_lang::prelude::*;

#[derive(Accounts)]

pub struct DeleteCustomer<'info> {
    #[account(mut, close = merchant_authority)]
    pub customer_account: Account<'info, Customer>,
    #[account(mut)]
    pub merchant_authority: Signer<'info>,
    pub system_program: Program<'info, System>
}

pub fn handler(
    ctx: Context<DeleteCustomer>
) -> Result<()> {
  msg!("Customer: {}, Delete", ctx.accounts.customer_account.authority);
    Ok(())
}