use anchor_lang::prelude::*;
pub mod schemas;
pub mod instructions;
mod constants;
use crate::constants::*;

use instructions::*;
use schemas::*;

declare_id!("85WehtyqKfKjGTq9ad9V6J5iMX7KLsNSN5rdxaeqDQoy");

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

    pub fn initialize_merchant(ctx: Context<InitializeMerchant>, name: String, description: String, logo_url: String) -> Result<()> {
        initialize_merchant::handler(ctx, name, description, logo_url)
    }

    pub fn update_merchant(ctx: Context<UpdateMerchant>, name: String, description: String, logo_url: String) -> Result<()> {
        update_merchant::handler(ctx, name, description, logo_url)
    }


    pub fn initialize_customer(ctx: Context<InitializeCustomer>, description: String, customer_wallet: Pubkey) -> Result<()> {
        initialize_customer::handler(ctx, description, customer_wallet)
    }

    pub fn update_customer(ctx: Context<UpdateCustomer>, description: String) -> Result<()> {
        update_customer::handler(ctx, description)
    }

    pub fn delete_customer(ctx: Context<DeleteCustomer>) -> Result<()> {
        delete_customer::handler(ctx)
    }

    pub fn initialize_product(
        ctx: Context<InitializeProduct>,
        name: String,
        authority: Pubkey,
        description: String,
        sku: String,
        default_price: Pubkey,
        unit_label: String,
        images: Vec<String>
    ) -> Result<()> {
        initialize_product::handler(
            ctx, name, authority, description, sku, default_price, unit_label, images
        )
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
