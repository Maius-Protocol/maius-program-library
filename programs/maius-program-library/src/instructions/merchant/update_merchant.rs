use anchor_lang::prelude::*;
use crate::Merchant;

#[derive(Accounts)]
#[instruction(description: String)]

pub struct UpdateMerchant<'info> {
    #[account(
        mut,
        constraint = merchant_account.merchant_wallet_address == *payer.key,
    )]
    pub merchant_account: Account<'info, Merchant>,
    pub system_program: Program<'info, System>,
    #[account(mut)]
    pub payer: Signer<'info>,
}

pub fn handler(
    ctx: Context<UpdateMerchant>,
    name: String, description: String, logo_url: String
) -> Result<()> {
    let merchant = &mut ctx.accounts.merchant_account;
    merchant.name = name;
    merchant.description = description;
    merchant.logo_url = logo_url;
    Ok(())
}
