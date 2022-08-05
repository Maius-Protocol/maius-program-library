import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../provider/ProgramProvider";
import { useMutation } from "@tanstack/react-query";
import { findMerchantAddress } from "../merchant/address";
import { findCustomerAddress } from "../customer/address";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { findCustomerInvoiceAddress } from "./address";

export function useCreateCustomerInvoiceAccount(
  merchant_wallet_address: string,
  customer_wallet_address: string | undefined
) {
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgram();
  return useMutation(async () => {
    const customerInvoiceAddress = await findCustomerInvoiceAddress(
      merchant_wallet_address,
      customer_wallet_address!
    );
    const transaction = await program.methods
      .initializeCustomerInvoice(
        new PublicKey(merchant_wallet_address),
        new PublicKey(customer_wallet_address!)
      )
      .accounts({
        customerInvoiceAccount: customerInvoiceAddress,
        authority: customer_wallet_address,
        systemProgram: SystemProgram.programId,
      })
      .transaction();
    await sendTransaction(transaction, connection);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });
}
