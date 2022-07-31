import { useMutation } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../provider/ProgramProvider";
import { findPricingAddress } from "./address";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { findProductAddress } from "../product/address";

export function useCreatePricingAccount(
  merchantWalletAddress: string,
  product_count_index: number,
  price_count_index: number
) {
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgram();
  return useMutation(async () => {
    const product_account_address = await findProductAddress(
      merchantWalletAddress,
      product_count_index
    );
    const pricing_account_address = await findPricingAddress(
      merchantWalletAddress,
      product_account_address?.toBase58(),
      price_count_index
    );
    const transaction = await program.methods
      .initializePrice(new PublicKey(product_account_address))
      .accounts({
        priceAccount: pricing_account_address,
        productAccount: product_account_address,
        merchant: merchantWalletAddress,
        systemProgram: SystemProgram.programId,
      })
      .transaction();
    await sendTransaction(transaction, connection);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });
}
