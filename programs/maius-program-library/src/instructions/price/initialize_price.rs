use anchor_lang::prelude::*;
use crate::schemas::*;
use anchor_spl::token::{Mint};
// use crate::errors::*;

#[derive(Accounts)]
#[instruction(product: Pubkey)]
pub struct InitializePrice<'info> {
    #[account(
        init_if_needed,
        seeds = [
            b"v1",
            PRICE_PREFIX.as_bytes(),
            merchant.to_account_info().key().as_ref(),
            product.key().as_ref(),
            product_account.price_count.to_string().as_ref()
        ],
        bump,
        payer = merchant,
        space = Price::space()
    )]
    pub price_account: Account<'info, Price>,
    #[account(mut)]
    pub product_account: Account<'info, Product>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializePrice>,
    product: Pubkey,
) -> Result<()> {
    msg!("Initialize a new Price of Product: {}",
        product);
    ctx.accounts.price_account.authority = ctx.accounts.merchant.key();
    ctx.accounts.price_account.product = product;
    ctx.accounts.price_account.created = Clock::get().unwrap().unix_timestamp;
    ctx.accounts.price_account.updated = Clock::get().unwrap().unix_timestamp;
    ctx.accounts.product_account.price_count += 1;
    Ok(())
}