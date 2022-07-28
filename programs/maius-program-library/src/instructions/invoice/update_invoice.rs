use anchor_lang::prelude::*;
use crate::schemas::*;

#[derive(Accounts)]
pub struct UpdateInvoice<'info> {
    #[account(mut)]
    pub invoice_account: Account<'info, Invoice>,
    #[account(mut)]
    pub merchant_account: Account<'info, Merchant>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<UpdateInvoice>,
    total: u64,
    period_end: i64,
    period_start: i64,
    paid: bool,
    status: String
) ->  Result<()> {
    ctx.accounts.invoice_account.total = total;
    ctx.accounts.invoice_account.period_end = period_end;
    ctx.accounts.invoice_account.period_start = period_start;
    ctx.accounts.invoice_account.status = status;
    ctx.accounts.invoice_account.paid = paid;
    Ok(())
}
