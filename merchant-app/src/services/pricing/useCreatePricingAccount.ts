import { useMutation } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../provider/ProgramProvider";
import { findPricingAddress } from "./address";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { findProductAddress } from "../product/address";

export function useCreatePricingAccount(
  merchantWalletAddress: string,
  product_count_index: number
) {
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgram();
  return useMutation(async () => {
    const product_account_address = await findProductAddress(
      merchantWalletAddress,
      product_count_index
    );
    const pricingAccountAddress = await findPricingAddress(
      merchantWalletAddress,
      product_account_address?.toBase58(),
      product_count_index
    );
    const transaction = await program.methods
      .initializePrice(new PublicKey(product_account_address))
      .accounts({
        priceAccount: pricingAccountAddress,
        productAccount: new PublicKey(product_account_address),
        merchantAuthority: new PublicKey(merchantWalletAddress),
        systemProgram: SystemProgram.programId,
      })
      .transaction();
    await sendTransaction(transaction, connection);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });
}
