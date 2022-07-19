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
  const merchant_wallet_addr = wallet?.adapter?.publicKey?.toBase58() || "";
  return useMutation(async () => {
    const address = await findMerchantAddress(wallet?.adapter?.publicKey);
    const genesisCustomer = await findCustomerAddress(
      wallet?.adapter?.publicKey
    );
    console.log({
      merchant: address,
      genesisCustomer: genesisCustomer,
      merchantWallet: wallet?.adapter?.publicKey,
      systemProgram: SystemProgram.programId,
    });
    const transaction = await program.methods
      .initializeMerchant(
        "MaiusPay",
        "Awesome store",
        "https://i.pravatar.cc/300"
      )
      .accounts({
        merchant: address,
        genesisCustomer: genesisCustomer,
        merchantWallet: wallet?.adapter?.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .transaction();
    return await sendTransaction(transaction, connection);
  });
}
