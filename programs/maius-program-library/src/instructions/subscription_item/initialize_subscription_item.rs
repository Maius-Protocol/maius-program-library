use anchor_lang::prelude::*;
use crate::schemas::*;

#[derive(Accounts)]
pub struct InitializeSubscriptionItem<'info> {
    #[account(
    init_if_needed,
    seeds = [
    b"v1",
    SUBSCRIPTION_ITEM_PREFIX.as_bytes(),
    subscription_account.key().as_ref(),
    subscription_account.subscription_item_count.to_string().as_ref()
    ],
    bump,
    payer = merchant,
    space = Subscription::space()
    )]
    pub subscription_item_account: Account<'info, SubscriptionItem>,
    #[account(mut)]
    pub subscription_account: Account<'info, Subscription>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializeSubscriptionItem>,
    price: Pubkey,
    bill_thresholds: u64,
    quantity: u8,
) ->  Result<()> {
    ctx.accounts.subscription_item_account.price = price;
    ctx.accounts.subscription_item_account.quantity = quantity;
    ctx.accounts.subscription_item_account.billing_thresholds = bill_thresholds;
    ctx.accounts.subscription_item_account.created = Clock::get().unwrap().unix_timestamp;
    ctx.accounts.subscription_account.subscription_item_count += 1;
    Ok(())
}
