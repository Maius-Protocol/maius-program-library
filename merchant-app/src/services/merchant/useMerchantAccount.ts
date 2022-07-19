import { useQuery } from "react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../provider/ProgramProvider";
import { findMerchantAddress } from "./address";

export function useMerchantAccount() {
  const { wallet } = useWallet();
  const { program } = useProgram();
  const merchant_wallet_addr = wallet?.adapter?.publicKey?.toBase58() || "";
  return useQuery(
    [useMerchantAccount, merchant_wallet_addr],
    async () => {
      const address = await findMerchantAddress(wallet?.adapter?.publicKey);
      return await program.account.merchant.fetch(address);
    },
    {
      enabled: merchant_wallet_addr !== "",
      retry: false,
    }
  );
}
