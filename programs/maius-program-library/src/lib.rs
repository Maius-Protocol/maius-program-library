use anchor_lang::prelude::*;
use anchor_spl::token::{Mint};
pub mod schemas;
pub mod instructions;
mod constants;
use crate::constants::*;

use instructions::*;
use schemas::*;

declare_id!("C4PuSuSn9rw9ET1TsM8WRQRJTKDqFyS1uPWvmxza3TBj");

#[macro_export]
macro_rules! debug {
    ($($rest:tt)*) => {
    #[cfg(feature="verbose")]
        anchor_lang::prelude:: msg!($($rest)*)
    };
}

#[program]
pub mod maius_program_library {
    use crate::instructions::invoice_item::{initialize_invoice_item, InitializeInvoiceItem};
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
        sku: String,
        name: String,
        authority: Pubkey,
        description: String,
        default_price: Pubkey,
        unit_label: String,
        images: Vec<String>
    ) -> Result<()> {
        initialize_product::handler(
            ctx, sku, name, authority, description,  default_price, unit_label, images
        )
    }

    pub fn update_product(
        ctx: Context<UpdateProduct>,
        description: String,
        name: String,
        default_price: Pubkey,
        unit_label: String,
        images: Vec<String>
    ) -> Result<()> {
        update_product::handler(
            ctx, description, name, default_price, unit_label, images
        )
    }

    pub fn initialize_price(
        ctx: Context<InitializePrice>,
        product: Pubkey, 
        billing_scheme: String, 
        currency: String, 
        unit_amount: u64, 
        interval: String, 
        interval_count: u8, 
        active: bool, 
        price_type: String,
        accepted_tokens: Vec<Pubkey>
    ) -> Result<()> {
        initialize_price::handler(
            ctx, 
            product, 
            billing_scheme, 
            currency, 
            unit_amount, 
            interval, 
            interval_count, 
            active, 
            price_type,
            accepted_tokens
        )
    }

    pub fn update_price(
        ctx: Context<UpdatePrice>,
        billing_scheme: String,
        currency: String,
        unit_amount: u64,
        interval: String, 
        interval_count: u8, 
        active: bool,
        price_type: String,
    ) -> Result<()> {
        update_price::handler(
            ctx,
            billing_scheme,
            currency,
            unit_amount,
            interval, 
            interval_count,
            active,
            price_type
        )
    }
    pub fn initialize_subscription(
        ctx: Context<InitializeSubscription>,
        merchant_wallet: Pubkey,
        customer_wallet: Pubkey,
        last_invoice: Pubkey
    ) -> Result<()> {
        initialize_subscription::handler(ctx, merchant_wallet, customer_wallet, last_invoice)
    }

    pub fn initialize_subscription_item(
        ctx: Context<InitializeSubscriptionItem>,
        price: Pubkey,
        bill_thresholds: u64,
        quantity: u8,
    ) -> Result<()> {
        initialize_subscription_item::handler(ctx, price, bill_thresholds, quantity)
    }

    pub fn initialize_invoice(
        ctx: Context<InitializeInvoice>,
        customer_account: Pubkey,
        subscription_account: Pubkey,
    ) -> Result<()> {
        initialize_invoice::handler(ctx, customer_account, subscription_account)
    }

    pub fn initialize_invoice_item(
        ctx: Context<InitializeInvoiceItem>,
        customer_account: Pubkey,
        price: Pubkey,
        quantity: u64
    ) -> Result<()> {
        initialize_invoice_item::handler(ctx, customer_account, price, quantity)
    }

    pub fn initialize_accepted_tokens(
        ctx: Context<InitializeAcceptedTokens>,
        tokens: Vec<Pubkey>
    ) -> Result<()> {
        initialize_accepted_tokens::handler(
            ctx, 
            tokens
        )
    }
}
