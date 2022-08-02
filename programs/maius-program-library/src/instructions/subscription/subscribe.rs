use anchor_lang::prelude::*;
use crate::schemas::Subscription;
use pyth_sdk_solana::{load_price_feed_from_account_info, PriceFeed, Price};
use anchor_spl::token::{self, TokenAccount, Mint, Token, Transfer};

#[derive(Accounts)]
#[instruction()]
pub struct Subscribe<'info> {
    pub subscription_account: Account<'info, Subscription>,
    pub system_program: Program<'info, System>,
    /// CHECK:
    pub price_account_info: AccountInfo<'info>, // Pyth price_account
}

pub fn handler(
    ctx: Context<Subscribe>
) ->  Result<()> {

    let subscription_account = &mut ctx.accounts.subscription_account;
    let totalSubscriptionTime = subscription_account.current_period_end - subscription_account.current_period_start;
    msg!("totalSubscriptionTime: {}", totalSubscriptionTime);

    let usdValue = 0;
    usdValueToTokenAmount(usdValue, ctx.accounts.price_account_info.clone());
    
    Ok(())
}

pub fn usdValueToTokenAmount(usdValue: u128, price_account_info: AccountInfo) {
    let price_feed: PriceFeed = load_price_feed_from_account_info(&price_account_info).unwrap();
    let current_price: Price = price_feed.get_current_price().unwrap();
    msg!("price: ({} +- {}) x 10^{}", current_price.price, current_price.conf, current_price.expo);
}