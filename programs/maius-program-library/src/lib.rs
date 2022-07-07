use anchor_lang::prelude::*;
pub mod schemas;
pub mod instructions;
mod constants;

use instructions::*;

declare_id!("5aoQ5SF77E73o8KqfXc2LHMP3yfbwkqPgnd6aAAw1bfJ");

#[program]
pub mod maius_program_library {
    use super::*;

    pub fn initialize_customer(ctx: Context<InitializeCustomer>, description: String, customer_wallet: Pubkey) -> Result<()> {
        // handler(ctx, description, customer_wallet);

        ctx.accounts.customer_account.authority = customer_wallet;
        ctx.accounts.customer_account.description = description;
        ctx.accounts.customer_account.bump = *ctx.bumps.get("customer_account").unwrap();

        Ok(())
    }

    // pub fn initialize_product(ctx: Context<InitializeProduct>) -> Result<()> {
    //     Ok(())
    // }

    // pub fn initialize_price(ctx: Context<InitializePrice>) -> Result<()> {
    //     Ok(())
    // }

    // pub fn initialize_invoice(ctx: Context<InitializeInvoice>) -> Result<()> {
    //     Ok(())
    // }

    // pub fn initialize_invoice_item(ctx: Context<InitializeInvoiceItem>) -> Result<()> {
    //     Ok(())
    // }

    // pub fn initialize_subscription(ctx: Context<InitializeSubscription>) -> Result<()> {
    //     Ok(())
    // }

    // pub fn initialize_subscription_item(ctx: Context<InitializeSubscriptionItem>) -> Result<()> {
    //     Ok(())
    // }


    // pub fn update_customer(ctx: Context<UpdateCustomer>) -> Result<()> {
    //     Ok(())
    // }
}
