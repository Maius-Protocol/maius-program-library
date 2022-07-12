use anchor_lang::prelude::*;
use crate::schemas::Customer;
use crate::errors::*;
use crate::Merchant;

#[derive(Accounts)]
#[instruction(capacity: u16, name: String, description: String, logo_url: String)]
pub struct InitializeMerchant<'info> {
    #[account(init,
    payer=merchant_wallet,
    space=Merchant::space(capacity),
    seeds=[
    b"v1",
    Merchant::MERCHANT_PREFIX.as_bytes(),
    merchant_wallet.to_account_info().key.as_ref(),
    ], bump)]
    pub merchant: Account<'info, Merchant>,
    #[account(mut)]
    pub merchant_wallet: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializeMerchant>,
    capacity: u16, name: String, description: String, logo_url: String
) -> Result<()> {
    msg!("Initialize [Merchant]: with params {} // {} // {} // {}", capacity, name, description, logo_url);
    let merchant = &mut ctx.accounts.merchant;
    merchant.authority = *ctx.accounts.merchant_wallet.to_account_info().key;
    merchant.name = name;
    merchant.description = description;
    merchant.logo_url = logo_url;
    merchant.capacity = capacity;
    Ok(())
}
