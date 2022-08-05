use anchor_lang::prelude::*;
use crate::schemas::*;

#[derive(Accounts)]
#[instruction(merchant_wallet: Pubkey, customer_wallet: Pubkey)]
pub struct InitializeCustomerInvoice<'info> {
    #[account(
    init_if_needed,
    seeds = [
        b"v1",
        CUSTOMER_INVOICE_PREFIX.as_bytes(),
        merchant_wallet.key().as_ref(),
        customer_wallet.key().as_ref()
    ],
    bump,
    payer = authority,
    space = CustomerInvoice::space()
    )]
    pub customer_invoice_account: Account<'info, CustomerInvoice>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializeCustomerInvoice>,
    merchant_wallet: Pubkey,
    customer_wallet: Pubkey
) ->  Result<()> {
    ctx.accounts.customer_invoice_account.invoice_count = 0;
    Ok(())
}