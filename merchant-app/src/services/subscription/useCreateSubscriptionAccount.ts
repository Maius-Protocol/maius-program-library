import { useMutation } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../provider/ProgramProvider";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { findCustomerAddress } from "../customer/address";
import { findMerchantAddress } from "../merchant/address";
import { findInvoiceAddress } from "../invoice/address";
import { BN } from "@project-serum/anchor";
import { findSubscriptionAddress } from "./address";

export function useCreateSubscriptionAccount(
  merchant_wallet_address: string,
  customer_wallet_address: string,
  invoice_count_index: number,
  subscription_count_index: number
) {
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgram();
  return useMutation(async ({ current_period_end }) => {
    const customer_account = await findCustomerAddress(customer_wallet_address);
    const merchant_account = await findMerchantAddress(merchant_wallet_address);
    const subscription_account = await findSubscriptionAddress(
      customer_wallet_address,
      subscription_count_index
    );
    const last_invoice = await findInvoiceAddress(
      customer_wallet_address,
      invoice_count_index
    );

    const transaction = await program.methods
      .initializeSubscription(
        new PublicKey(merchant_wallet_address),
        new PublicKey(customer_wallet_address),
        last_invoice,
        new BN(current_period_end)
      )
      .accounts({
        subscriptionAccount: subscription_account,
        merchantAccount: merchant_account,
        customerAccount: customer_account,
        authority: customer_wallet_address,
        systemProgram: SystemProgram.programId,
      })
      .transaction();
    await sendTransaction(transaction, connection);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });
}
