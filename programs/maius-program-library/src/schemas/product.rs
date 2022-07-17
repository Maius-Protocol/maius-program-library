use anchor_lang::prelude::*;
use crate::constants::*;

#[account]
#[derive(Default)]
pub struct Product {
    pub bump: u8,
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

// impl Product {
//     pub fn space(description: &str, sku: &str, name: &str, unit_label: &str, images: &Vec<String>) -> usize {
//         8 +  // discriminator
//         1 + // bump
//         PUBKEY_SIZE + // authority
//         description.len() + // description,
//         sku.len() + 
//         BOOL_SIZE +
//         PUBKEY_SIZE +
//         name.len() + 
//         unit_label.len() +
//         I64_SIZE
        
//     }
// }