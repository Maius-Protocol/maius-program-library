use anchor_lang::prelude::*;
use crate::schemas::*;

#[derive(Accounts)]
pub struct InitializeInvoice<'info> {
    #[account(
    init_if_needed,
    seeds = [
    b"v1",
    INVOICE_PREFIX.as_bytes(),
    merchant_account.key().as_ref(),
    merchant_account.subscription_count.to_string().as_ref(),
    ],
    bump,
    payer = merchant,
    space = Invoice::space()
    )]
    pub subscription_account: Account<'info, Subscription>,
    #[account(mut)]
    pub merchant_account: Account<'info, Merchant>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializeInvoice>,
    merchant_account: Pubkey,
    customer_account: Pubkey,
    last_invoice: Pubkey,
) ->  Result<()> {
    ctx.accounts.subscription_account.merchant_account = merchant_account;
    ctx.accounts.subscription_account.customer_account = customer_account;
    ctx.accounts.subscription_account.last_invoice = last_invoice;
    ctx.accounts.subscription_account.created = Clock::get().unwrap().unix_timestamp;
    ctx.accounts.subscription_account.status = "active".to_string();
    ctx.accounts.merchant_account.subscription_count += 1;
    Ok(())
}
