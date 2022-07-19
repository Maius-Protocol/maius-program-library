use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorMessage {
    #[msg("Invalid length of billing_scheme.")]
    InvalidBillingSchemeLen,
    #[msg("Invalid length of interval.")]
    InvalidIntervalLen,
    #[msg("Invalid length of interval_count.")]
    InvalidIntervalCountLen,
}