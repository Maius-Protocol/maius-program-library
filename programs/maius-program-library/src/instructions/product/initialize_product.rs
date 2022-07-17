use anchor_lang::prelude::*;
use crate::schemas::*;
use crate::errors::*;

#[derive(Accounts)]
#[instruction(sku: String)]
pub struct InitializeProduct<'info> {
    #[account(
    init_if_needed,
    seeds = [
    PRODUCT_PREFIX.as_bytes(),
    merchant.key().as_ref(),
    ],
    bump,
    payer = merchant,
    space = ProductAuthor::space()
    )]
    pub product_account_author: Account<'info, ProductAuthor>,
    #[account(
    init_if_needed,
    seeds = [
    PRODUCT_PREFIX.as_bytes(),
    sku.as_bytes(),
    merchant.key().as_ref(),
    ],
    bump,
    payer = merchant,
    space = Product::space()
    )]
    pub product_account: Account<'info, Product>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub clock: Sysvar<'info, Clock>,
}

pub fn handler(
    ctx: Context<InitializeProduct>,
    sku: String,
    name: String,
    authority: Pubkey,
    description: String,
    default_price: Pubkey,
    unit_label: String,
    images: Vec<String>
) -> Result<()> {
    let product_account_author = &mut ctx.accounts.product_account_author;

    if !product_account_author.has_already_been_initialized {
        product_account_author.has_already_been_initialized = true;
        product_account_author.authority = authority;
        product_account_author.product_accounts = vec![];
    }
    ctx.accounts.product_account.authority = authority;
    ctx.accounts.product_account.description = description;
    ctx.accounts.product_account.name = name;
    ctx.accounts.product_account.sku = sku;
    ctx.accounts.product_account.default_price = default_price;
    ctx.accounts.product_account.unit_label = unit_label;
    ctx.accounts.product_account.images = images;
    ctx.accounts.product_account.active = false;
    let clock = &ctx.accounts.clock;
    ctx.accounts.product_account.updated_at = clock.unix_timestamp;
    product_account_author.product_accounts.push(ctx.accounts.product_account.key());
    Ok(())
}
