use anchor_lang::prelude::*;
use crate::schemas::*;
// use crate::errors::*;

#[derive(Accounts)]
#[instruction(product: Pubkey, billing_scheme: String, currency: String, unit_amount: u64, interval: String, interval_count: u8, active: bool, price_type: String)]
pub struct InitializePrice<'info> {
    #[account(
        init_if_needed,
        seeds = [
            b"v1",
            Price::PRICE_PREFIX.as_bytes(),
            merchant_authority.key().as_ref(),
            product.key().as_ref(),
            product.price_account
        ],
        bump,
        payer = merchant_authority,
        space = Price::space()
    )]
    pub price_account: Account<'info, Price>,
    pub system_program: Program<'info, System>,
    pub product_account: Account<'info, Product>,
    #[account(mut)]
    pub merchant_authority: Signer<'info>,
}

pub fn handler(
    ctx: Context<InitializePrice>,
    product: Pubkey, 
    billing_scheme: String,
    currency: String,
    unit_amount: u64,
    interval: String, 
    interval_count: u8, 
    active: bool,
    price_type: String,
    created: u64,
    updated: u64,
    product_price_index: String
) -> Result<()> {
    msg!("Initialize a new Price with product: {}, billing_scheme: {}, unit_amount: {}, interval: {}, interval_count: {}, active: {}, price_type: {}, created: {}, updated: {}", 
        product, billing_scheme, unit_amount, interval, interval_count, active, price_type, created, updated);

    ctx.accounts.price_account.product = product;
    ctx.accounts.price_account.billing_scheme = billing_scheme;
    ctx.accounts.price_account.currency = currency;
    ctx.accounts.price_account.interval = interval;
    ctx.accounts.price_account.interval_count = interval_count;
    ctx.accounts.price_account.active = active;
    ctx.accounts.price_account.price_type = price_type;
    ctx.accounts.price_account.created = created;
    ctx.accounts.price_account.updated = updated;

    Ok(())
} 
