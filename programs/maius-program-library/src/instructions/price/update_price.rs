use anchor_lang::prelude::*;
use crate::schemas::Price;

#[derive(Accounts)]
#[instruction(billing_scheme: String, currency: String, unit_amount: u64, interval: String, interval_count: u8, active: bool, price_type: String)]
pub struct UpdatePrice<'info> {
    #[account(mut)]
    pub price_account: Account<'info, Price>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub system_program: Program<'info, System>
}

pub fn handler(
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
    msg!("Update Price: {} with billing_scheme: {}, unit_amount: {}, interval: {}, interval_count: {}, active: {}, price_type: {}",
    ctx.accounts.price_account.key(), billing_scheme, unit_amount, interval, interval_count, active, price_type);
    
    if !billing_scheme.is_empty() {
        ctx.accounts.price_account.billing_scheme = billing_scheme;
    }
    if !currency.is_empty() {
        ctx.accounts.price_account.currency = currency;
    }
    if unit_amount > 0 {
        ctx.accounts.price_account.unit_amount = unit_amount;
    }
    if !interval.is_empty() {
        ctx.accounts.price_account.interval = interval;
    }
    if interval_count > 0 {
        ctx.accounts.price_account.interval_count = interval_count;
    }
    if !price_type.is_empty() {
        ctx.accounts.price_account.price_type = price_type;
    }
    if !accepted_tokens.is_empty() {
        ctx.accounts.price_account.accepted_tokens = accepted_tokens;
    }
    ctx.accounts.price_account.active = active;
    ctx.accounts.price_account.updated = Clock::get().unwrap().unix_timestamp;    
    
    Ok(())
}