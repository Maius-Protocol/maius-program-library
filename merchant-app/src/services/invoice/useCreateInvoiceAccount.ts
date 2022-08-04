import { useMutation, useQuery } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../provider/ProgramProvider";
import { findInvoiceAddress, findMerchantAddress } from "./address";
import { globalState } from "../../../../tests/maius-program-library";
import { PublicKey, SystemProgram, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { findCustomerAddress } from "../customer/address";

export function useCreateInvoiceAccount(
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
    const transaction = await program.methods
      .initializeInvoice(customer_account, subscription_account)
      .accounts({
        merchant: address,
        genesisCustomer: genesisCustomer,
        merchantWallet: new PublicKey(merchantWalletAddress),
        systemProgram: SystemProgram.programId,
      })
      .transaction();
    await sendTransaction(transaction, connection);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });
}
