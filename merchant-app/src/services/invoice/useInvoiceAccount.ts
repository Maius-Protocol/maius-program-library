import { useQuery } from "@tanstack/react-query";
import { useProgram } from "../../provider/ProgramProvider";
import { findInvoiceAddress, useInvoiceKey } from "./address";

export function useInvoiceAccount(
  customer_wallet_address: string,
  invoice_count_index: number
) {
  const { program } = useProgram();
  return useQuery(
    [useInvoiceKey, customer_wallet_address, invoice_count_index],
    async () => {
      const invoice_account = await findInvoiceAddress(
        customer_wallet_address,
        invoice_count_index
      );

      return await program.account.invoice.fetch(invoice_account);
    },
    {
      // onError: (error) => {
      //   console.log(error?.toString()?.includes("Account does not exist"));
      // },
      retry: false,
      enabled:
        invoice_count_index !== null &&
        invoice_count_index !== undefined &&
        customer_wallet_address !== null &&
        customer_wallet_address !== "",
    }
  );
}
