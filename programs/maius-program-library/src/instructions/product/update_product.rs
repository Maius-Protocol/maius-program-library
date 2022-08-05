use anchor_lang::prelude::*;
use crate::schemas::*;
// use crate::errors::*;

#[derive(Accounts)]
#[instruction()]
pub struct UpdateProduct<'info> {
    #[account(
        mut,
        constraint = product_account.authority == *merchant.key,
    )]
    pub product_account: Account<'info, Product>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<UpdateProduct>,
    description: String,
    name: String,
    default_price: Pubkey,
    unit_label: String,
    images: Vec<String>
) -> Result<()> {
    ctx.accounts.product_account.description = description;
    ctx.accounts.product_account.name = name;
    ctx.accounts.product_account.default_price = default_price;
    ctx.accounts.product_account.unit_label = unit_label;
    ctx.accounts.product_account.images = images;
    ctx.accounts.product_account.active = false;
    ctx.accounts.product_account.updated = Clock::get().unwrap().unix_timestamp;
    Ok(())
}
