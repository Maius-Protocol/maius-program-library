use anchor_lang::prelude::*;
use crate::constants::*;

pub const CUSTOMER_INVOICE_PREFIX: &'static str = "customer_invoice";

#[account]
#[derive(Default)]
pub struct CustomerInvoice {
    pub invoice_count: u64
}

impl CustomerInvoice {
    // FYI: https://github.com/coral-xyz/anchor/blob/master/lang/syn/src/codegen/program/handlers.rs#L98
    pub fn space() -> usize {
        8 +  // discriminator
        8 // invoice_count
    }

}
