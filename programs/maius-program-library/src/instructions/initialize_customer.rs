use anchor_lang::prelude::*;
use crate::schemas::Customer;

#[derive(Accounts)]
#[instruction(description: String, customer_wallet: Pubkey)]
pub struct InitializeCustomer<'info> {
    #[account(
        init,
        seeds = [
            b"customer_account".as_ref(),
            customer_wallet.key().as_ref(),
        ],
        bump,
        payer = merchant_authority,
        space = Customer::space(&description)
    )]
    pub customer_account: Account<'info, Customer>,
    #[account(mut)]
    pub merchant_authority: Signer<'info>,
    pub system_program: Program<'info, System>
}

pub fn handler(
    ctx: Context<InitializeCustomer>, 
    description: String, 
    customer_wallet: Pubkey
) -> Result<()> {
    ctx.accounts.customer_account.authority = customer_wallet;
    ctx.accounts.customer_account.description = description;
    ctx.accounts.customer_account.bump = *ctx.bumps.get("customer_account").unwrap();
    Ok(())
}