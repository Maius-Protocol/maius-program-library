use anchor_lang::prelude::*;
use crate::constants::*;

#[account]
#[derive(Default)]
pub struct Merchant {
    pub authority: Pubkey,
    pub capacity: u16,
    pub name: String,
    pub description: String,
    pub logo_url: String,
    pub customers: Vec<Pubkey>,
}

impl Merchant {
    pub const MERCHANT_PREFIX: &'static str = "merchant";
    pub const NAME_MAX_LEN: usize = 128;
    pub const DESCRIPTION_MAX_LEN: usize = 256;
    pub const LOGO_URL_MAX_LEN: usize = 256;

    pub fn space(capacity: u16) -> usize {
        8 + 2 +
            4 + Merchant::NAME_MAX_LEN +
            4 + Merchant::DESCRIPTION_MAX_LEN +
            4 + Merchant::LOGO_URL_MAX_LEN +
            4 + (capacity as usize) * std::mem::size_of::<Pubkey>()
    }

}
