import { useMutation } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../provider/ProgramProvider";
import { SystemProgram } from "@solana/web3.js";
import { findMerchantAddress } from "../merchant/address";
import { findProductAddress } from "./address";

export interface useCreateProductInput {
  sku: string;
  name: string;
  description: string;
  images: any[];
}

export function useCreateProduct(
  merchantWalletAddress: string,
  product_count_index: number
) {
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgram();
  return useMutation<unknown, unknown, useCreateProductInput>(
    async ({ sku, name, description, images }) => {
      const merchantAccountAddress = await findMerchantAddress(
        merchantWalletAddress
      );
      const productAccountAddress = await findProductAddress(
        merchantWalletAddress,
        product_count_index
      );

      const transaction = await program.methods
        .initializeProduct(
          sku,
          name,
          description,
          "",
          images.map((e) => e?.url)
        )
        .accounts({
          productAccount: productAccountAddress,
          merchantAccount: merchantAccountAddress,
          merchant: merchantWalletAddress,
          systemProgram: SystemProgram.programId,
        })
        .transaction();

      await sendTransaction(transaction, connection);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  );
}
