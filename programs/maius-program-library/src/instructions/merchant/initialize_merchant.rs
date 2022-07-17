use anchor_lang::prelude::*;
use crate::schemas::Customer;
use crate::errors::*;
use crate::{Merchant};

#[derive(Accounts)]
#[instruction(name: String, description: String, logo_url: String)]
pub struct InitializeMerchant<'info> {
    #[account(init,
    payer=merchant_wallet,
    space=Merchant::space(),
    seeds=[
    b"v1",
    Merchant::MERCHANT_PREFIX.as_bytes(),
    merchant_wallet.to_account_info().key.as_ref(),
    ], bump)]
    pub merchant: Account<'info, Merchant>,
    #[account(init,
    payer=merchant_wallet,
    space=Customer::space(),
    seeds=[
    b"v1",
    Customer::CUSTOMER_PREFIX.as_bytes(),
    merchant_wallet.to_account_info().key.as_ref(),
    ], bump)]
    pub genesis_customer: Account<'info, Customer>,
    #[account(mut)]
    pub merchant_wallet: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializeMerchant>,
    name: String, description: String, logo_url: String
) -> Result<()> {
    msg!("Initialize [Merchant]: with params {} // {} // {}", name, description, logo_url);
    let merchant = &mut ctx.accounts.merchant;
    let genesis_customer = &mut ctx.accounts.genesis_customer;
    merchant.merchant_wallet_address = *ctx.accounts.merchant_wallet.to_account_info().key;
    merchant.name = name;
    merchant.description = description;
    merchant.logo_url = logo_url;
    merchant.current_customer_key = genesis_customer.key();
    genesis_customer.authority = *ctx.accounts.merchant_wallet.to_account_info().key;
    genesis_customer.description = "Genesis customer is merchant itself".parse().unwrap();
    Ok(())
}

