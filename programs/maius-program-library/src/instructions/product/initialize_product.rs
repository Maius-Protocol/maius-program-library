use anchor_lang::prelude::*;
use crate::schemas::*;
// use crate::errors::*;

#[derive(Accounts)]
pub struct InitializeProduct<'info> {
    #[account(
    init_if_needed,
    seeds = [
    b"v1",
    PRODUCT_PREFIX.as_bytes(),
    merchant.to_account_info().key.as_ref(),
    merchant_account.product_count.to_string().as_ref(),
    ],
    bump,
    payer = merchant,
    space = Product::space()
    )]
    pub product_account: Account<'info, Product>,
    #[account(mut)]
    pub merchant_account: Account<'info, Merchant>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializeProduct>,
    sku: String,
    name: String,
    description: String,
    unit_label: String,
    images: Vec<String>
) ->  Result<()> {
    ctx.accounts.product_account.authority = ctx.accounts.merchant.key();

    ctx.accounts.product_account.description = description;
    ctx.accounts.product_account.name = name;
    ctx.accounts.product_account.sku = sku;
    ctx.accounts.product_account.unit_label = unit_label;
    ctx.accounts.product_account.price_count = 0;
    ctx.accounts.product_account.images = images;
    ctx.accounts.product_account.active = false;
    ctx.accounts.product_account.created = Clock::get().unwrap().unix_timestamp;
    ctx.accounts.product_account.updated = Clock::get().unwrap().unix_timestamp;
    ctx.accounts.merchant_account.product_count += 1;
    Ok(())
}
