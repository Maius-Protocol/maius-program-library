import { useMutation } from "react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../provider/ProgramProvider";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { findCustomerAddress } from "../customer/address";
import { findMerchantAddress } from "../merchant/address";

export interface useCreateCustomerAccountInput {
  customer_wallet: string;
  description: string;
}

export function useCreateCustomerAccount(merchantWalletAddress: string) {
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgram();
  return useMutation<unknown, unknown, useCreateCustomerAccountInput>(
    async ({ customer_wallet, description }) => {
      const merchantAccountAddress = await findMerchantAddress(
        merchantWalletAddress
      );
      const customerAccountAddress = await findCustomerAddress(customer_wallet);
      const transaction = await program.methods
        .initializeCustomer(description, new PublicKey(customer_wallet))
        .accounts({
          merchantAuthority: merchantWalletAddress,
          merchantAccount: merchantAccountAddress,
          customerAccount: customerAccountAddress,
          systemProgram: SystemProgram.programId,
        })
        .transaction();
      await sendTransaction(transaction, connection);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  );
}
