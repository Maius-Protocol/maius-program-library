use anchor_lang::prelude::*;
use crate::schemas::*;
use anchor_spl::token::{Mint};
// use crate::errors::*;

#[derive(Accounts)]
#[instruction(product: Pubkey, billing_scheme: String, currency: String, unit_amount: u64, interval: String, interval_count: u8, active: bool, price_type: String, accepted_tokens: Vec<Pubkey>)]
pub struct InitializePrice<'info> {
    #[account(
        init_if_needed,
        seeds = [
            b"v1",
            PRICE_PREFIX.as_bytes(),
            merchant_authority.key().as_ref(),
            product.key().as_ref(),
            product_account.price_count.to_string().as_ref()
        ],
        bump,
        payer = merchant_authority,
        space = Price::space()
    )]
    pub price_account: Account<'info, Price>,
    pub system_program: Program<'info, System>,
    #[account(mut)]
    pub product_account: Account<'info, Product>,
    #[account(mut)]
    pub merchant_authority: Signer<'info>,
}

pub fn handler(
    ctx: Context<InitializePrice>,
    product: Pubkey,
) -> Result<()> {
    msg!("Initialize a new Price of Product: {}",
        product);

    ctx.accounts.price_account.product = product;
    ctx.accounts.product_account.price_count += 1;

    Ok(())
}