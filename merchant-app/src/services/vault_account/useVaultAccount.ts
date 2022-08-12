import { useQuery } from "@tanstack/react-query";
import { findVaultAccountAddress, useVaultAccountKey } from "./address";

import * as splToken from "@solana/spl-token";
import { useConnection } from "@solana/wallet-adapter-react";
import { findInvoiceAddress } from "../invoice/address";

export function useVaultAccount(
  customer_wallet_address: string,
  invoice_count_index: number
) {
  const { connection } = useConnection();
  return useQuery(
    [useVaultAccountKey, customer_wallet_address, invoice_count_index],
    async () => {
      const invoice_account_address = await findInvoiceAddress(
        customer_wallet_address,
        invoice_count_index
      );

      const vault_account = await findVaultAccountAddress(
        invoice_account_address?.toBase58()
      );

      return await splToken.getAccount(connection, vault_account);
    },
    {
      retry: false,
    }
  );
}
