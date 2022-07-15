use anchor_lang::prelude::*;
use crate::constants::*;

pub const MAXIMUM_PRODUCT_PER_AUTHOR :usize = 30;
pub const MAXIMUM_IMAGE_PER_PRODUCT :usize = 8;
pub const MAXIMUM_LENGTH_OF_IMAGE_URL :usize = 256;
pub const MAXIMUM_LENGTH_OF_DESCRIPTION_PRODUCT :usize = 512;
pub const MAXIMUM_LENGTH_OF_SKU_PRODUCT :usize = 128;
pub const MAXIMUM_LENGTH_OF_NAME_PRODUCT :usize = 128;
pub const MAXIMUM_LENGTH_OF_UNIT_LABEL_PRODUCT :usize = 128;
pub const PRODUCT_PREFIX: &'static str = "product";

#[account]
#[derive(Default)]
pub struct Product {
    pub authority: Pubkey,
    pub description: String,
    pub sku: String,
    pub active: bool,
    pub default_price: Pubkey,
    pub name: String,
    pub unit_label: String,
    pub updated_at: i64,
    pub images: Vec<String>,
}

impl Product {
    pub fn space() -> usize {
        8 +  // discriminator
        1 + // bump
        PUBKEY_SIZE + // authority
        4 + MAXIMUM_LENGTH_OF_DESCRIPTION_PRODUCT + // description,
        4 + MAXIMUM_LENGTH_OF_SKU_PRODUCT + // sku
        BOOL_SIZE + // active
        PUBKEY_SIZE + // default_price
        4 + MAXIMUM_LENGTH_OF_NAME_PRODUCT + // name
        4 + MAXIMUM_LENGTH_OF_UNIT_LABEL_PRODUCT + // unit_label
        I64_SIZE + // update_at
        4 + MAXIMUM_IMAGE_PER_PRODUCT*4 + MAXIMUM_IMAGE_PER_PRODUCT*MAXIMUM_LENGTH_OF_IMAGE_URL // images
    }
}


#[account]
pub struct ProductAuthor {
    pub authority: Pubkey,
    pub has_already_been_initialized: bool,
    pub product_accounts: Vec<Pubkey>,
}
impl ProductAuthor {
    pub fn space() -> usize {
        8 + // discriminator
        PUBKEY_SIZE + // authority
        1 + // has_already_been_initialized
        4 + (PUBKEY_SIZE * MAXIMUM_PRODUCT_PER_AUTHOR)  // product_accounts
    }
}