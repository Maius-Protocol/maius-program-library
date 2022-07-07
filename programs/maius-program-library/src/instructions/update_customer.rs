use anchor_lang::prelude::*;
use crate::schemas::Customer;

#[derive(Accounts)]
#[instruction(description: String)]

pub struct UpdateCustomer<'info> {
    pub customer_account: Account<'info, Customer>,
    #[account(mut)]
    pub merchant_authority: Signer<'info>,
    pub system_program: Program<'info, System>
}
