use anchor_lang::prelude::*;
use crate::schemas::*;
use crate::errors::*;

#[derive(Accounts)]
#[instruction()]
pub struct DeleteProduct<'info> {
    #[account(
    mut,
    close=merchant
    )]
    pub product_account: Account<'info, Product>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<DeleteProduct>
) -> Result<()> {
    msg!("Product: {}, Delete", ctx.accounts.product_account.name);
    Ok(())
}
