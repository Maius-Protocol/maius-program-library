import { useMutation, useQuery } from "react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../provider/ProgramProvider";
import { findMerchantAddress } from "./address";
import { globalState } from "../../../../tests/maius-program-library";
import { SystemProgram } from "@solana/web3.js";
import { findCustomerAddress } from "../customer/address";

interface useUpdateMerchantAccountInput {
  name: string;
  description: string;
  logo_url: string;
}

export function useUpdateMerchantAccount(merchantWalletAddress: string) {
  const { wallet, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgram();
  return useMutation<unknown, unknown, useUpdateMerchantAccountInput>(
    async ({ name, description, logo_url }) => {
      const address = await findMerchantAddress(merchantWalletAddress);
      const transaction = await program.methods
        .updateMerchant(name, description, logo_url)
        .accounts({
          merchantAccount: address,
          systemProgram: SystemProgram.programId,
        })
        .transaction();
      await sendTransaction(transaction, connection);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return;
    }
  );
}
