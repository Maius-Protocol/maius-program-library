import { useMutation, useQuery } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../provider/ProgramProvider";
import { findInvoiceAddress, findMerchantAddress } from "./address";
import { globalState } from "../../../../tests/maius-program-library";
import { PublicKey, SystemProgram, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { findCustomerAddress } from "../customer/address";
import { findCustomerInvoiceAddress } from "../customer_invoice/address";

export function useCreateInvoiceAccount(
  merchant_wallet_address: string,
  customer_wallet_address: string,
  invoice_count_index: number
) {
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgram();
  return useMutation(async () => {
    const address = await findInvoiceAddress(
      customer_wallet_address,
      invoice_count_index
    );
    const customer_account = await findCustomerAddress(customer_wallet_address);
    const customer_invoice_account = await findCustomerInvoiceAddress(
      merchant_wallet_address,
      customer_wallet_address!
    );
    const invoice_account = await findInvoiceAddress(
      customer_wallet_address,
      invoice_count_index
    );
    const transaction = await program.methods
      .initializeInvoice(
        new PublicKey(customer_wallet_address),
        customer_account
      )
      .accounts({
        invoiceAccount: invoice_account,
        customerInvoiceAccount: customer_invoice_account,
        authority: customer_wallet_address,
        systemProgram: SystemProgram.programId,
      })
      .transaction();
    await sendTransaction(transaction, connection);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });
}
