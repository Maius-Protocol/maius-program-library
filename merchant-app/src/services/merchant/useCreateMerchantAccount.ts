import { useMutation, useQuery } from "react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../provider/ProgramProvider";
import { findMerchantAddress } from "./address";
import { globalState } from "../../../../tests/maius-program-library";
import { SystemProgram } from "@solana/web3.js";
import { findCustomerAddress } from "../customer/address";

export function useCreateMerchantAccount() {
  const { wallet, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgram();
  return useMutation(async () => {
    const address = await findMerchantAddress(wallet?.adapter?.publicKey);
    const genesisCustomer = await findCustomerAddress(
      wallet?.adapter?.publicKey
    );
    const transaction = await program.methods
      .initializeMerchant()
      .accounts({
        merchant: address,
        genesisCustomer: genesisCustomer,
        merchantWallet: wallet?.adapter?.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .transaction();
    await sendTransaction(transaction, connection);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  });
}
