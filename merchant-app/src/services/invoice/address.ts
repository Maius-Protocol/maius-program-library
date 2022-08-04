import { PublicKey } from "@solana/web3.js";
import { programID } from "../../../config/globalVariables";

export const useInvoiceKey = "invoice";

export const findInvoiceAddress = async (
  customer_wallet_address: string,
  invoice_count_index: number
) => {
  const [address] = await PublicKey.findProgramAddress(
    [
      Buffer.from("v1"),
      Buffer.from(useInvoiceKey),
      new PublicKey(customer_wallet_address).toBuffer(),
      Buffer.from(invoice_count_index?.toString()),
    ],
    programID
  );
  return address;
};
