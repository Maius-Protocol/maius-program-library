use anchor_lang::prelude::*;
use crate::schemas::*;

#[derive(Accounts)]
#[instruction(customer_wallet: Pubkey)]
pub struct InitializeInvoice<'info> {
    #[account(
    init_if_needed,
    seeds = [
    b"v1",
    INVOICE_PREFIX.as_bytes(),
    customer_wallet.key().as_ref(),
    customer_invoice_account.invoice_count.to_string().as_ref()
    ],
    bump,
    payer = authority,
    space = Invoice::space()
    )]
    pub invoice_account: Account<'info, Invoice>,
    #[account(mut)]
    pub customer_invoice_account: Account<'info, CustomerInvoice>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializeInvoice>,
    customer_wallet: Pubkey,
    customer_account_address: Pubkey,
) ->  Result<()> {
    let invoice_account = &mut ctx.accounts.invoice_account;
    invoice_account.customer_account = customer_account_address;
    invoice_account.created = Clock::get().unwrap().unix_timestamp;
    invoice_account.status = "draft".to_string();
    ctx.accounts.customer_invoice_account.invoice_count += 1;
    Ok(())
}