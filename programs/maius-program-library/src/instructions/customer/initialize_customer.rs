use anchor_lang::prelude::*;
use crate::schemas::Customer;
// use crate::errors::*;

#[derive(Accounts)]
#[instruction(description: String, customer_wallet: Pubkey)]
pub struct InitializeCustomer<'info> {
    #[account(
        init_if_needed,
        seeds = [
            // version,
            Customer::CUSTOMER_PREFIX.as_bytes(),
            customer_wallet.key().as_ref(),
        ],
        bump,
        payer = merchant_authority,
        space = Customer::space()
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
    msg!("Customer: {}, Create with description: {}", customer_wallet, description);
    // require!(
    //     description.len() <= Customer::DESCRIPTION_MAX_LEN,
    //     ErrorMessage::InvalidDescLen    
    // );
    ctx.accounts.customer_account.authority = customer_wallet;
    ctx.accounts.customer_account.description = description;
    Ok(())
} 
