use anchor_lang::prelude::*;
use crate::schemas::*;

#[derive(Accounts)]
pub struct InitializeInvoice<'info> {
    #[account(
    init_if_needed,
    seeds = [
    b"v1",
    INVOICE_PREFIX.as_bytes(),
    customer_account.key().as_ref(),
    customer_account.invoice_count.to_string().as_ref()
    ],
    bump,
    payer = merchant,
    space = Invoice::space()
    )]
    pub invoice_account: Account<'info, Invoice>,
    #[account(mut)]
    pub merchant_account: Account<'info, Merchant>,
    #[account(mut)]
    pub customer_account: Account<'info, Customer>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializeInvoice>,
    customer_account: Pubkey,
    subscription_account: Pubkey,
) ->  Result<()> {
    ctx.accounts.invoice_account.customer_account = customer_account;
    ctx.accounts.invoice_account.subscription_account = subscription_account;
    ctx.accounts.invoice_account.created = Clock::get().unwrap().unix_timestamp;
    ctx.accounts.invoice_account.status = "draft".to_string();
    ctx.accounts.customer_account.invoice_count += 1;
    Ok(())
}
