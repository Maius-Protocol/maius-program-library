import { PublicKey } from "@solana/web3.js";
import { programID } from "../../../config/globalVariables";

export const useCustomerInvoiceKey = "customer_invoice";

export const findCustomerInvoiceAddress = async (
  merchant_wallet_address: string,
  customer_wallet_address: string
) => {
  const [address] = await PublicKey.findProgramAddress(
    [
      Buffer.from("v1"),
      Buffer.from(useCustomerInvoiceKey),
      new PublicKey(merchant_wallet_address).toBuffer(),
      new PublicKey(customer_wallet_address).toBuffer(),
    ],
    programID
  );
  return address;
};
