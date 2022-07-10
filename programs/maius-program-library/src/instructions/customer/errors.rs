use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorMessage {
    #[msg("Invalid length of description.")]
    InvalidDescLen,
}