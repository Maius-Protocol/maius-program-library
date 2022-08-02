use anchor_lang::prelude::*;
use crate::schemas::Subscription;
use pyth_sdk_solana::{load_price_feed_from_account_info, PriceFeed, Price};
use anchor_spl::token::{self, TokenAccount, Mint, Token, Transfer};

#[derive(Accounts)]
pub struct Subscribe<'info> {
    pub subscription_account: Account<'info, Subscription>,
    pub system_program: Program<'info, System>,
    /// CHECK:
    pub pyth_price_account: AccountInfo<'info>, // Pyth price_account
    #[account(mut)]
    pub payer: Signer<'info>,
}

pub fn handler(
    ctx: Context<Subscribe>
) ->  Result<()> {

    let subscription_account = &mut ctx.accounts.subscription_account;
    let pyth_price_account = ctx.accounts.pyth_price_account.clone();
    let totalSubscriptionTime = subscription_account.current_period_end - subscription_account.current_period_start;
    
    msg!("subscription_account: {}", subscription_account.key());
    msg!("current_period_start: {}", subscription_account.current_period_start);
    msg!("current_period_end: {}", subscription_account.current_period_end);
    msg!("totalSubscriptionTime: {}", totalSubscriptionTime);

    let usdValue = 0;
    usdValueToTokenAmount(usdValue, pyth_price_account);
    
    Ok(())
}

pub fn usdValueToTokenAmount(usdValue: u128, pyth_price_account: AccountInfo) {
    // let price_feed: PriceFeed = load_price_feed_from_account_info(&pyth_price_account).unwrap();
    // let current_price: Price = price_feed.get_current_price().unwrap();
    // msg!("price: ({} +- {}) x 10^{}", current_price.price, current_price.conf, current_price.expo);
}