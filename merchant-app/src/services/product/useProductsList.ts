import { useInfiniteQuery } from "@tanstack/react-query";
import { useProgram } from "../../provider/ProgramProvider";
import { findProductAddress, useProductKey } from "./address";
import { useMerchantAccountKey } from "../merchant/address";

export function useProductsList(
  merchantWalletAddress: string,
  totalPage: number
) {
  const { program } = useProgram();
  return useInfiniteQuery(
    [useMerchantAccountKey, merchantWalletAddress, useProductKey],
    async ({ pageParam = 0 }) => {
      const address = await findProductAddress(
        merchantWalletAddress,
        pageParam
      );
      return await program.account.product.fetch(address);
    },
    {
      enabled: merchantWalletAddress !== null && merchantWalletAddress !== "",
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => {
        if (allPages.length < totalPage) {
          return totalPage - allPages.length;
        }
        return undefined;
      },
    }
  );
}
