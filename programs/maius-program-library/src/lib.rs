use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    mint,
    token::{self, Mint, Token, TokenAccount, Transfer, SetAuthority},
};
pub mod schemas;
pub mod instructions;
mod constants;
use crate::constants::*;

use instructions::*;
use schemas::*;

declare_id!("Cqc31DtkxfXQrEcSzDfS5Cdqb9LsENwfiMv9inEofjQm");

#[macro_export]
macro_rules! debug {
    ($($rest:tt)*) => {
    #[cfg(feature="verbose")]
        anchor_lang::prelude:: msg!($($rest)*)
    };
}

#[program]
pub mod maius_program_library {
    use std::borrow::{Borrow, BorrowMut};
    use anchor_spl::token::TokenAccount;
    use super::*;

    pub fn initialize_merchant(ctx: Context<InitializeMerchant>) -> Result<()> {
        initialize_merchant::handler(ctx)
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
        description: String,
        unit_label: String,
        images: Vec<String>
    ) -> Result<()> {
        initialize_product::handler(
            ctx, sku, name, description, unit_label, images
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
    ) -> Result<()> {
        initialize_price::handler(
            ctx,
            product,
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
        accepted_tokens: Vec<Pubkey>,
    ) -> Result<()> {
        update_price::handler(
            ctx,
            billing_scheme,
            currency,
            unit_amount,
            interval,
            interval_count,
            active,
            price_type,
            accepted_tokens,
        )
    }
    pub fn initialize_subscription(
        ctx: Context<InitializeSubscription>,
        merchant_wallet: Pubkey,
        customer_wallet: Pubkey,
        last_invoice: Pubkey,
        current_period_end: i64
    ) -> Result<()> {
        initialize_subscription::handler(ctx, merchant_wallet, customer_wallet, last_invoice, current_period_end)
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
        customer_wallet: Pubkey,
        customer_account_address: Pubkey,
    ) -> Result<()> {
        initialize_invoice::handler(ctx, customer_wallet, customer_account_address)
    }

    pub fn update_invoice(
        ctx: Context<UpdateInvoice>,
        total: u64,
        period_end: i64,
        period_start: i64,
        paid: bool,
        status: String
    ) -> Result<()> {
        update_invoice::handler(ctx, total, period_end, period_start, paid, status)
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

    pub fn initialize_customer_invoice(
        ctx: Context<InitializeCustomerInvoice>,
        merchant_wallet: Pubkey,
        customer_wallet: Pubkey
    ) -> Result<()> {
        initialize_customer_invoice::handler(ctx, merchant_wallet, customer_wallet)
    }

    pub fn subscribe(
        ctx: Context<Subscribe>,
    ) -> Result<()> {
        subscribe::handler(
            ctx
        )
    }


    pub fn merchant_withdrawl(
        ctx: Context<TransferForMerchant>,
        amount: u64,
    ) ->  Result<()> {
        transfer_for_merchant::handler(ctx, amount)
    }

    pub fn payment(
        ctx: Context<PaymentContext>,
        quantity: u8,
    ) -> Result<()> {
        let customer_wallet = &mut ctx.accounts.customer_wallet;
        let merchant_wallet = &mut ctx.accounts.merchant_wallet;
        let customer_account = &mut ctx.accounts.customer_account;
        let merchant_account = &mut ctx.accounts.merchant_account;
        let customer_invoice_account = &mut ctx.accounts.customer_invoice_account;
        let invoice_account = &mut ctx.accounts.invoice_account;
        let invoice_item_account = &mut ctx.accounts.invoice_item_account;
        let price_account = &mut ctx.accounts.price_account;
        let subscription_account = &mut ctx.accounts.subscription_account;
        let subscription_item_account = &mut ctx.accounts.subscription_item_account;
        // let escrow_account = &mut ctx.accounts.escrow_account;
        let customer_deposit_token_account = &mut ctx.accounts.customer_deposit_token_account.clone();
        let merchant_receive_token_account = &mut ctx.accounts.merchant_receive_token_account.clone();
        let vault_account = &mut ctx.accounts.vault_account;
        let cpi_program = ctx.accounts.token_program.to_account_info();

        customer_account.authority = customer_wallet.to_account_info().key();
        customer_account.description = "Test".parse().unwrap();
        customer_account.prev_customer_key = merchant_account.current_customer_key;
        customer_account.created = Clock::get().unwrap().unix_timestamp;
        merchant_account.current_customer_key = customer_account.key();

        customer_invoice_account.invoice_count += 1;

        invoice_item_account.customer_account = customer_account.key();
        invoice_item_account.price = price_account.key();
        invoice_item_account.quantity = quantity as u64;
        invoice_item_account.amount = (quantity as u64) * price_account.unit_amount;
        invoice_account.invoice_item_count += 1;

        // Transfer

        // escrow_account.customer = customer_wallet.to_account_info().key();
        // escrow_account.merchant = merchant_wallet.to_account_info().key();
        // escrow_account.customer_deposit_token_account = customer_deposit_token_account.key();
        // escrow_account.merchant_receive_token_account = merchant_receive_token_account.key();
        // escrow_account.amount = 10;
        // escrow_account.invoice_account = invoice_account.key();
        // escrow_account.status = 0;

        let amount = 10000000;

        let cpi_accounts = Transfer {
            from: customer_deposit_token_account.to_account_info(),
            to: vault_account.to_account_info(),
            authority: customer_wallet.to_account_info(),
        };

        token::transfer( CpiContext::new(cpi_program, cpi_accounts), amount)?;

        // escrow_account.amount += amount;


        subscription_account.merchant = merchant_account.merchant_wallet_address;
        subscription_account.merchant_account = merchant_account.key();
        subscription_account.customer_account = customer_account.key();
        subscription_account.last_invoice = invoice_account.key();
        subscription_account.created = Clock::get().unwrap().unix_timestamp;
        subscription_account.current_period_start = Clock::get().unwrap().unix_timestamp;
        // subscription_account.current_period_end = current_period_end;
        subscription_account.status = "active".to_string();
        customer_account.subscription_count += 1;

        subscription_item_account.price = price_account.key();
        subscription_item_account.quantity = quantity;
        // subscription_item_account.billing_thresholds = bill_thresholds;
        subscription_item_account.created = Clock::get().unwrap().unix_timestamp;
        subscription_account.subscription_item_count += 1;
        Ok(())
    }

    #[derive(Accounts)]
    pub struct PaymentContext<'info> {
        #[account(
            init_if_needed,
            seeds = [
            b"v1",
            Customer::CUSTOMER_PREFIX.as_bytes(),
            customer_wallet.key().as_ref(),
            ],
            bump,
            payer = customer_wallet,
            space = Customer::space()
        )]
        pub customer_account: Box<Account<'info, Customer>>,
        #[account(mut)]
        pub merchant_account: Box<Account<'info, Merchant>>,
        pub merchant_wallet: Signer<'info>,
        #[account(mut)]
        pub customer_wallet: Signer<'info>,
        #[account(
            init_if_needed,
            seeds = [
            b"v1",
            CUSTOMER_INVOICE_PREFIX.as_bytes(),
            merchant_wallet.key().as_ref(),
            customer_wallet.key().as_ref()
            ],
            bump,
            payer = customer_wallet,
            space = CustomerInvoice::space()
            )]
            pub customer_invoice_account: Box<Account<'info, CustomerInvoice>>,
            #[account(
            init_if_needed,
            seeds = [
            b"v1",
            INVOICE_PREFIX.as_bytes(),
            customer_wallet.key().as_ref(),
            customer_invoice_account.invoice_count.to_string().as_ref()
            ],
            bump,
            payer = customer_wallet,
            space = Invoice::space()
        )]
        pub invoice_account: Box<Account<'info, Invoice>>,
        #[account(
            init_if_needed,
            seeds = [
            b"v1",
            INVOICE_ITEM_PREFIX.as_bytes(),
            invoice_account.key().as_ref(),
            invoice_account.invoice_item_count.to_string().as_ref(),
            ],
            bump,
            payer = customer_wallet,
            space = InvoiceItem::space()
        )]
        pub invoice_item_account: Box<Account<'info, InvoiceItem>>,
        #[account(mut)]
        pub price_account: Box<Account<'info, Price>>,
        #[account(
            init_if_needed,
            seeds = [
            b"v1",
            SUBSCRIPTION_PREFIX.as_bytes(),
            customer_wallet.to_account_info().key.as_ref(),
            &[customer_account.subscription_count].as_ref()
            ],
            bump,
            payer = customer_wallet,
            space = Subscription::space()
        )]
        pub subscription_account: Box<Account<'info, Subscription>>,
        #[account(
            init_if_needed,
            seeds = [
            b"v1",
            SUBSCRIPTION_ITEM_PREFIX.as_bytes(),
            subscription_account.key().as_ref(),
            &[subscription_account.subscription_item_count].as_ref()
            ],
            bump,
            payer = customer_wallet,
            space = Subscription::space()
        )]
        pub subscription_item_account: Box<Account<'info, SubscriptionItem>>,
        pub system_program: Program<'info, System>,
        pub mint: Account<'info, Mint>,
        #[account(
            init_if_needed,
            seeds = [
            b"v1",
            b"token-seed".as_ref(),
            invoice_account.key().as_ref()
            ],
            bump,
            payer = customer_wallet,
            token::mint = mint,
            token::authority = vault_account,
        )]
        pub vault_account: Box<Account<'info, TokenAccount>>,
        #[account(mut)]
        pub customer_deposit_token_account: Account<'info, TokenAccount>,
        #[account(mut)]
        pub merchant_receive_token_account: Account<'info, TokenAccount>,
        // #[account(
            // init_if_needed,
            // seeds = [
            // b"v1",
            // b"escrow-account".as_ref(),
            // invoice_account.key().as_ref()
            // ],
            // bump,
            // space = EscrowAccount::space(),
            // payer = customer_wallet,
        // )]
        // pub escrow_account: Account<'info, EscrowAccount>,
        pub rent: Sysvar<'info, Rent>,
        pub token_program: Program<'info, Token>,

    }
}

