use anchor_lang::prelude::*;
use crate::InitializeInvoice;
use crate::schemas::*;

#[derive(Accounts)]
#[instruction(invoice_account_address: Pubkey)]
pub struct InitializeInvoiceItem<'info> {
    #[account(
    init_if_needed,
    seeds = [
    b"v1",
    INVOICE_ITEM_PREFIX.as_bytes(),
    invoice_account_address.key().as_ref(),
    invoice_account.invoice_item_count.to_string().as_ref(),
    ],
    bump,
    payer = authority,
    space = InvoiceItem::space()
    )]
    pub invoice_item_account: Account<'info, InvoiceItem>,
    #[account(mut)]
    pub invoice_account: Account<'info, Invoice>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializeInvoiceItem>,
    invoice_account_address: Pubkey,
    customer_account: Pubkey,
    price: Pubkey,
    quantity: u64,
) ->  Result<()> {
    let invoice_item_account = &mut ctx.accounts.invoice_item_account;
    let invoice_account = &mut ctx.accounts.invoice_account;
    invoice_item_account.customer_account = customer_account;
    invoice_item_account.price = price;
    invoice_item_account.quantity = quantity;
    invoice_account.invoice_item_count += 1;
    Ok(())
}
