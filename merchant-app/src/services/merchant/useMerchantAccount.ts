import { useQuery } from "react-query";
import { useProgram } from "../../provider/ProgramProvider";
import { findMerchantAddress, useMerchantAccountKey } from "./address";

export function useMerchantAccount(merchantWalletAddress: string) {
  const { program } = useProgram();
  return useQuery(
    [useMerchantAccountKey, merchantWalletAddress],
    async () => {
      const address = await findMerchantAddress(merchantWalletAddress);
      return await program.account.merchant.fetch(address);
    },
    {
      enabled: merchantWalletAddress !== null,
      retry: false,
    }
  );
}
