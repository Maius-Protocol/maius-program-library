use anchor_lang::prelude::*;
use crate::schemas::Price;

#[derive(Accounts)]
#[instruction(billing_scheme: String, currency: String, unit_amount: u64, interval: String, interval_count: u8, active: bool, price_type: String)]
pub struct UpdatePrice<'info> {
    #[account(mut)]
    pub customer_account: Account<'info, Customer>,
    #[account(mut)]
    pub merchant_authority: Signer<'info>,
    pub system_program: Program<'info, System>
}

pub fn handler(
    ctx: Context<UpdatePrice>, 
    description: String,
) -> Result<()> {
    msg!("Customer: {}, Update description: {}", ctx.accounts.customer_account.authority, description);
    ctx.accounts.customer_account.description = description;
    Ok(())
}