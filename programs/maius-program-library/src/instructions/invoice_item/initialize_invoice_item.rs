use anchor_lang::prelude::*;
use crate::InitializeInvoice;
use crate::schemas::*;

#[derive(Accounts)]
pub struct InitializeInvoiceItem<'info> {
    #[account(
    init_if_needed,
    seeds = [
    b"v1",
    INVOICE_ITEM_PREFIX.as_bytes(),
    customer_account.key().as_ref(),
    invoice_account.invoice_item_count.to_string().as_ref(),
    ],
    bump,
    payer = merchant,
    space = InvoiceItem::space()
    )]
    pub invoice_item_account: Account<'info, InvoiceItem>,
    #[account(mut)]
    pub merchant_account: Account<'info, Merchant>,
    #[account(mut)]
    pub invoice_account: Account<'info, Invoice>,
    #[account(mut)]
    pub customer_account: Account<'info, Customer>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializeInvoiceItem>,
    customer_account: Pubkey,
    price: Pubkey,
    quantity: u64,
) ->  Result<()> {
    ctx.accounts.invoice_item_account.customer_account = customer_account;
    ctx.accounts.invoice_item_account.price = price;
    ctx.accounts.invoice_item_account.quantity = quantity;
    ctx.accounts.invoice_account.invoice_item_count += 1;
    Ok(())
}
