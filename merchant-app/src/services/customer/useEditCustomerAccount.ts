import { useMutation } from "react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../provider/ProgramProvider";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useCreateCustomerAccountInput } from "./useCreateCustomerAccount";
import { findCustomerAddress } from "./address";

export function useEditCustomerAccount(customerWalletAddress: string) {
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { program, merchantWalletAddress } = useProgram();
  return useMutation<unknown, unknown, useCreateCustomerAccountInput>(
    async ({ description }) => {
      const customerAccountAddress = await findCustomerAddress(
        customerWalletAddress
      );
      const transaction = await program.methods
        .updateCustomer(description)
        .accounts({
          merchantAuthority: new PublicKey(merchantWalletAddress),
          customerAccount: customerAccountAddress,
          systemProgram: SystemProgram.programId,
        })
        .transaction();
      await sendTransaction(transaction, connection);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  );
}
