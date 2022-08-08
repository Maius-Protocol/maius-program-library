import { Connection, PublicKey } from "@solana/web3.js";
import { programID } from "../../../config/globalVariables";
import { useCustomerInvoiceKey } from "../customer_invoice/address";
import {
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";

export const useVaultAccountKey = "token-seed";

export const findVaultAccountAddress = async (
  invoice_account_address: string
) => {
  const [address] = await PublicKey.findProgramAddress(
    [
      Buffer.from("v1"),
      Buffer.from(useVaultAccountKey),
      new PublicKey(invoice_account_address).toBuffer(),
    ],
    programID
  );
  return address;
};

export const findAssociatedAccountAddress = async (
  mint_address: string,
  customer_wallet: string
) => {
  return await getAssociatedTokenAddress(
    new PublicKey(mint_address),
    new PublicKey(customer_wallet)
  );
};

export const findEscrowAccount = async (invoice_account_address: string) => {
  const [address] = await PublicKey.findProgramAddress(
    [
      Buffer.from("v1"),
      Buffer.from("escrow-account"),
      new PublicKey(invoice_account_address).toBuffer(),
    ],
    programID
  );
  return address;
};
