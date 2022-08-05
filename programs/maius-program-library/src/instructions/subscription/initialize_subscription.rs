use anchor_lang::prelude::*;
use crate::schemas::*;

#[derive(Accounts)]
pub struct InitializeSubscription<'info> {
    #[account(
    init_if_needed,
    seeds = [
    b"v1",
    SUBSCRIPTION_PREFIX.as_bytes(),
    authority.to_account_info().key.as_ref(),
    customer_account.subscription_count.to_string().as_ref(),
    ],
    bump,
    payer = authority,
    space = Subscription::space()
    )]
    pub subscription_account: Account<'info, Subscription>,
    #[account(
        mut,
        // constraint = merchant_account.merchant_wallet_address == *merchant.key,
    )]
    pub merchant_account: Account<'info, Merchant>,
    #[account(mut)]
    pub customer_account: Account<'info, Customer>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializeSubscription>,
    merchant_account_address: Pubkey,
    customer_account_address: Pubkey,
    last_invoice: Pubkey,
    current_period_end: i64
) ->  Result<()> {
    let subscription_account = &mut ctx.accounts.subscription_account;
    let merchant_account = &mut ctx.accounts.merchant_account;
    let customer_account = &mut ctx.accounts.customer_account;
    subscription_account.merchant = merchant_account.merchant_wallet_address;
    subscription_account.merchant_account = merchant_account_address;
    subscription_account.customer_account = customer_account_address;
    subscription_account.last_invoice = last_invoice;
    subscription_account.created = Clock::get().unwrap().unix_timestamp;
    subscription_account.current_period_start = Clock::get().unwrap().unix_timestamp;
    subscription_account.current_period_end = current_period_end;
    subscription_account.status = "active".to_string();
    customer_account.subscription_count += 1;
    Ok(())
}
