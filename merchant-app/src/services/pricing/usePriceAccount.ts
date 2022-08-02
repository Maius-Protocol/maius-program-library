import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useProgram } from "../../provider/ProgramProvider";
import { findPricingAddress, usePricingKey } from "./address";
import { useMerchantAccountKey } from "../merchant/address";
import { findProductAddress } from "../product/address";

export function usePriceAccount(
  merchantWalletAddress: string,
  product_count_index: number,
  price_count_index: number
) {
  const { program } = useProgram();
  return useQuery(
    [
      useMerchantAccountKey,
      merchantWalletAddress,
      usePricingKey,
      product_count_index,
      usePricingKey,
      price_count_index,
    ],
    async () => {
      const product_account_address = await findProductAddress(
        merchantWalletAddress,
        product_count_index
      );
      const pricing_account_address = await findPricingAddress(
        merchantWalletAddress,
        product_account_address?.toBase58(),
        price_count_index
      );
      return await program.account.price.fetch(pricing_account_address);
    },
    {
      enabled: product_count_index !== null && merchantWalletAddress !== "",
    }
  );
}
