use anchor_lang::prelude::*;
use crate::schemas::Customer;
use crate::errors::*;
use crate::Merchant;

#[derive(Accounts)]
#[instruction(description: String, customer_wallet: Pubkey)]
pub struct InitializeCustomer<'info> {
    #[account(
        init,
        seeds = [
            b"v1",
            Customer::CUSTOMER_PREFIX.as_bytes(),
            customer_wallet.key().as_ref(),
        ],
        bump,
        payer = merchant_authority,
        space = Customer::space()
    )]
    pub customer_account: Account<'info, Customer>,
    #[account(mut)]
    pub merchant_account: Account<'info, Merchant>,
    #[account(mut)]
    pub merchant_authority: Signer<'info>,
    pub system_program: Program<'info, System>
}

pub fn handler(
    ctx: Context<InitializeCustomer>,
    description: String,
    customer_wallet: Pubkey
) -> Result<()> {
    msg!("Customer: {}, Create with description: {}", customer_wallet, description);
    require!(
        description.len() <= Customer::DESCRIPTION_MAX_LEN,
        ErrorMessage::InvalidDescLen
    );
    let customer_account = &mut ctx.accounts.customer_account;
    let merchant_account = &mut ctx.accounts.merchant_account;
    customer_account.authority = customer_wallet;
    customer_account.description = description;

    customer_account.prev_customer_key = merchant_account.current_customer_key;
    merchant_account.current_customer_key = customer_account.key();
    Ok(())
}
