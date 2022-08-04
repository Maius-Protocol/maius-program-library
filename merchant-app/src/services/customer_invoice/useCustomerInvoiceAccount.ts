import { useQuery } from "@tanstack/react-query";
import { useProgram } from "../../provider/ProgramProvider";
import { findCustomerInvoiceAddress, useCustomerInvoiceKey } from "./address";

export function useCustomerInvoiceAccount(
  merchant_wallet_address: string,
  customer_wallet_address: string
) {
  const { program } = useProgram();
  return useQuery(
    [useCustomerInvoiceKey, merchant_wallet_address, customer_wallet_address],
    async () => {
      const customerInvoiceAccountAddress = await findCustomerInvoiceAddress(
        merchant_wallet_address,
        customer_wallet_address
      );
      return await program.account.customerInvoice.fetch(
        customerInvoiceAccountAddress
      );
    },
    {
      enabled:
        merchant_wallet_address !== null &&
        merchant_wallet_address !== "" &&
        customer_wallet_address !== null &&
        customer_wallet_address !== "",
    }
  );
}
