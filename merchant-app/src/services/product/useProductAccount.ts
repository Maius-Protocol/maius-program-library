import { useQuery } from "@tanstack/react-query";
import { useProgram } from "../../provider/ProgramProvider";
import { useMerchantAccountKey } from "../merchant/address";
import { findProductAddress, useProductKey } from "./address";

export function useProductAccount(
  merchantWalletAddress: string,
  product_count_index: number
) {
  const { program } = useProgram();
  return useQuery(
    [
      useMerchantAccountKey,
      merchantWalletAddress,
      useProductKey,
      product_count_index,
    ],
    async () => {
      console.log(merchantWalletAddress, product_count_index);
      const customerAccountAddress = await findProductAddress(
        merchantWalletAddress,
        product_count_index
      );
      return await program.account.product.fetch(customerAccountAddress);
    },
    {
      enabled:
        merchantWalletAddress !== null &&
        product_count_index !== undefined &&
        merchantWalletAddress !== "",
    }
  );
}
