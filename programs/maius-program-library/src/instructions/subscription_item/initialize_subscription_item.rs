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
    payer = authority,
    space = Subscription::space()
    )]
    pub subscription_item_account: Account<'info, SubscriptionItem>,
    #[account(
        mut,
        // constraint = subscription_account.merchant == *merchant.key,
    )]
    pub subscription_account: Account<'info, Subscription>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializeSubscriptionItem>,
    price: Pubkey,
    bill_thresholds: u64,
    quantity: u8,
) ->  Result<()> {
    let subscription_item_account = &mut ctx.accounts.subscription_item_account;
    let subscription_account = &mut ctx.accounts.subscription_account;
    subscription_item_account.price = price;
    subscription_item_account.quantity = quantity;
    subscription_item_account.billing_thresholds = bill_thresholds;
    subscription_item_account.created = Clock::get().unwrap().unix_timestamp;
    subscription_account.subscription_item_count += 1;
    Ok(())
}
