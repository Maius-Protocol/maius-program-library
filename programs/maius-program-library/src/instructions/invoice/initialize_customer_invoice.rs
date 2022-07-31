use anchor_lang::prelude::*;
use crate::schemas::*;

#[derive(Accounts)]
pub struct InitializeCustomerInvoice<'info> {
    #[account(
    init_if_needed,
    seeds = [
    b"v1",
    CUSTOMER_INVOICE_PREFIX.as_bytes(),
    customer_account.key().as_ref(),
    merchant_account.key().as_ref()
    ],
    bump,
    payer = merchant,
    space = CustomerInvoice::space()
    )]
    pub customer_invoice_account: Account<'info, CustomerInvoice>,
    #[account(mut)]
    pub merchant_account: Account<'info, Merchant>,
    #[account(mut)]
    pub customer_account: Account<'info, Customer>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializeCustomerInvoice>,
) ->  Result<()> {
    ctx.accounts.customer_invoice_account.invoice_count = 0;
    Ok(())
}