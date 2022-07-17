use anchor_lang::prelude::*;
pub mod schemas;
pub mod instructions;
mod constants;
use crate::constants::*;

use instructions::*;
use schemas::*;

declare_id!("5aoQ5SF77E73o8KqfXc2LHMP3yfbwkqPgnd6aAAw1bfJ");

#[macro_export]
macro_rules! debug {
    ($($rest:tt)*) => {
    #[cfg(feature="verbose")]
        anchor_lang::prelude:: msg!($($rest)*)
    };
}

#[program]
pub mod maius_program_library {
    use super::*;

    pub fn initialize_customer(ctx: Context<InitializeCustomer>, description: String, customer_wallet: Pubkey) -> Result<()> {
        initialize_customer::handler(ctx, description, customer_wallet)
    }

    pub fn update_customer(ctx: Context<UpdateCustomer>, description: String) -> Result<()> {
        update_customer::handler(ctx, description)
    }

    pub fn delete_customer(ctx: Context<DeleteCustomer>) -> Result<()> {
        delete_customer::handler(ctx)
    }

    // pub fn initialize_product(ctx: Context<InitializeProduct>) -> Result<()> {
    //     Ok(())
    // }

    pub fn initialize_price(ctx: Context<InitializePrice>, product: Pubkey, billing_scheme: String, currency: Currency, unit_amount: u64, interval: String, interval_count: u8, active: bool, price_type: String) -> Result<()> {
        initialize_price::handler(ctx, product, billing_scheme, currency, unit_amount, interval, interval_count, active, price_type);
    }

    pub fn update_price(ctx: Context<UpdatePrice>, description: String) -> Result<()> {
        update_customer::handler(ctx, description)
    }

    pub fn delete_price(ctx: Context<DeletePrice>) -> Result<()> {
        delete_customer::handler(ctx)
    }

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