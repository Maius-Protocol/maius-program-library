import { useQuery } from "@tanstack/react-query";
import { useProgram } from "../../provider/ProgramProvider";
import { findInvoiceItemAddress } from "./address";
import { findInvoiceAddress } from "../invoice/address";

export function useInvoiceItemAccount(
  customer_wallet_address: string,
  invoice_count_index: number,
  invoice_item_count_index: number
) {
  const { program } = useProgram();
  return useQuery(
    [
      useInvoiceKey,
      customer_wallet_address,
      invoice_count_index,
      invoice_item_count_index,
    ],
    async () => {
      const invoice_account = await findInvoiceAddress(
        customer_wallet_address,
        invoice_count_index
      );
      const invoice_item_account = await findInvoiceItemAddress(
        invoice_account?.toBase58(),
        invoice_item_count_index
      );

      return await program.account.invoiceItem.fetch(invoice_item_account);
    },
    {
      retry: false,
      enabled:
        invoice_item_count_index !== null &&
        invoice_item_count_index !== undefined &&
        invoice_count_index !== null &&
        !isNaN(invoice_count_index) &&
        invoice_count_index !== undefined &&
        customer_wallet_address !== null &&
        customer_wallet_address !== undefined,
    }
  );
}
