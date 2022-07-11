use anchor_lang::prelude::*;
use crate::schemas::*;
use crate::errors::*;

#[derive(Accounts)]
#[instruction(name: String)]
pub struct UpdateProduct<'info> {
    #[account(
        mut
    )]
    pub product_account: Account<'info, Product>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub clock: Sysvar<'info, Clock>,
}

pub fn handler(
    ctx: Context<UpdateProduct>,
    description: String,
    sku: String,
    default_price: Pubkey,
    unit_label: String,
    images: Vec<String>
) -> Result<()> {
    ctx.accounts.product_account.description = description;
    ctx.accounts.product_account.sku = sku;
    ctx.accounts.product_account.default_price = default_price;
    ctx.accounts.product_account.unit_label = unit_label;
    ctx.accounts.product_account.images = images;
    ctx.accounts.product_account.active = false;
    let clock = &ctx.accounts.clock;
    ctx.accounts.product_account.updated_at = clock.unix_timestamp;
    Ok(())
}
