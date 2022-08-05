import { useQuery } from "@tanstack/react-query";
import { useProgram } from "../../provider/ProgramProvider";
import { findInvoiceItemAddress, useInvoiceKey } from "./address";

export function useInvoiceItemAccount(
  invoice_account_address: string,
  invoice_item_count_index: number
) {
  const { program } = useProgram();
  return useQuery(
    [useInvoiceKey, invoice_account_address, invoice_item_count_index],
    async () => {
      const invoice_item_account = await findInvoiceItemAddress(
        invoice_account_address,
        invoice_item_count_index
      );

      return await program.account.invoiceItem.fetch(invoice_item_account);
    },
    {
      retry: false,
      enabled:
        invoice_item_count_index !== null &&
        invoice_item_count_index !== undefined &&
        invoice_account_address !== null &&
        invoice_account_address !== "",
    }
  );
}
