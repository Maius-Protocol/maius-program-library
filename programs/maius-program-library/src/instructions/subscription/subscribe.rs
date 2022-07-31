use anchor_lang::prelude::*;
use crate::schemas::Subscription;
use pyth_sdk_solana::{load_price_feed_from_account_info, PriceFeed, Price};

#[derive(Accounts)]
#[instruction()]
pub struct Subscribe<'info> {
    pub subscription_account: Account<'info, Subscription>,
    pub system_program: Program<'info, System>,
    pub price_account_info: AccountInfo<'info>,
}

pub fn handler(
    ctx: Context<Subscribe>
) ->  Result<()> {

    let usdValue = 0;
    usdValueToTokenAmount(usdValue, ctx.accounts.price_account_info);
    
    Ok(())
}

pub fn usdValueToTokenAmount(usdValue: u128, price_account_info: AccountInfo) {
    let price_feed: PriceFeed = load_price_feed_from_account_info(&price_account_info).unwrap();
    let current_price: Price = price_feed.get_current_price().unwrap();
    msg!("price: ({} +- {}) x 10^{}", current_price.price, current_price.conf, current_price.expo);
}