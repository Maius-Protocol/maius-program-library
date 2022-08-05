import { PublicKey } from "@solana/web3.js";
import { programID } from "../../../config/globalVariables";

export const useInvoiceItemKey = "invoice_item";

export const findInvoiceItemAddress = async (
  invoice_account_address: string,
  invoice_item_count_index: number
) => {
  const [address] = await PublicKey.findProgramAddress(
    [
      Buffer.from("v1"),
      Buffer.from(useInvoiceItemKey),
      new PublicKey(invoice_account_address).toBuffer(),
      Buffer.from(invoice_item_count_index?.toString()),
    ],
    programID
  );
  return address;
};
