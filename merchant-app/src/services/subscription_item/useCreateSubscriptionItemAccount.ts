import { useMutation } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../provider/ProgramProvider";
import { SystemProgram } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";
import { findSubscriptionItemAddress } from "./address";
import { findProductAddress } from "../product/address";
import { findPricingAddress } from "../pricing/address";
import { findSubscriptionAddress } from "../subscription/address";

export function useCreateSubscriptionItemAccount(
  merchant_wallet_address: string,
  customer_wallet_address: string,
  product_count_index: number,
  price_count_index: number,
  invoice_count_index: number
) {
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgram();
  return useMutation(
    async ({
      quantity,
      subscription_count_index,
      subscription_item_count_index,
    }) => {
      console.log({
        merchant_wallet_address,
        customer_wallet_address,
        product_count_index,
        price_count_index,
        invoice_count_index,
        subscription_count_index,
        subscription_item_count_index,
      });
      const subscription_account = await findSubscriptionAddress(
        customer_wallet_address,
        subscription_count_index
      );
      const subscription_item_account = await findSubscriptionItemAddress(
        customer_wallet_address,
        subscription_count_index,
        subscription_item_count_index
      );

      const product_account_address = await findProductAddress(
        merchant_wallet_address,
        product_count_index
      );
      const pricing_account_address = await findPricingAddress(
        merchant_wallet_address,
        product_account_address?.toBase58(),
        price_count_index
      );

      const transaction = await program.methods
        .initializeSubscriptionItem(
          pricing_account_address,
          new BN(0),
          quantity
        )
        .accounts({
          subscriptionAccount: subscription_account,
          subscriptionItemAccount: subscription_item_account,
          authority: customer_wallet_address,
          systemProgram: SystemProgram.programId,
        })
        .transaction();
      await sendTransaction(transaction, connection);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  );
}
