use anchor_lang::prelude::*;
use crate::schemas::Customer;

#[derive(Accounts)]
#[instruction(description: String)]

pub struct UpdateCustomer<'info> {
    #[account(mut)]
    pub customer_account: Account<'info, Customer>,
    #[account(mut)]
    pub merchant_authority: Signer<'info>,
    pub system_program: Program<'info, System>
}

pub fn handler(
    ctx: Context<UpdateCustomer>, 
    description: String,
) -> Result<()> {
    msg!("Customer: {}, Update description: {}", ctx.accounts.customer_account.authority, description);
    ctx.accounts.customer_account.description = description;
    Ok(())
}