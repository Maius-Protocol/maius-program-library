import { useInfiniteQuery } from "@tanstack/react-query";
import { useProgram } from "../../provider/ProgramProvider";
import { findPricingAddress, usePricingKey } from "./address";
import { useMerchantAccountKey } from "../merchant/address";
import { findProductAddress } from "../product/address";

export function usePricesList(
  merchantWalletAddress: string,
  product_id: number,
  totalPage: number
) {
  const { program } = useProgram();
  return useInfiniteQuery(
    [useMerchantAccountKey, merchantWalletAddress, usePricingKey, product_id],
    async ({ pageParam = 0 }) => {
      const product_account_address = await findProductAddress(
        merchantWalletAddress,
        product_id
      );
      console.log(
        merchantWalletAddress,
        product_account_address?.toBase58(),
        pageParam
      );

      const pricing_account_address = await findPricingAddress(
        merchantWalletAddress,
        product_account_address?.toBase58(),
        pageParam
      );
      return await program.account.price.fetch(pricing_account_address);
    },
    {
      enabled: product_id !== null && merchantWalletAddress !== "",
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
