import { useInfiniteQuery } from "@tanstack/react-query";
import { useProgram } from "../../provider/ProgramProvider";
import { useMerchantAccountKey } from "../merchant/address";
import { useCustomerAccountKey } from "./address";
import { SystemProgram } from "@solana/web3.js";

export function useCustomersList(current_customer_key: string) {
  const { program, merchantWalletAddress } = useProgram();
  return useInfiniteQuery(
    [useMerchantAccountKey, current_customer_key, useCustomerAccountKey],
    async ({ pageParam = current_customer_key }) => {
      return await program.account.customer.fetch(pageParam);
    },
    {
      enabled: current_customer_key !== null && current_customer_key !== "",
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => {
        if (
          lastPage?.prevCustomerKey?.toBase58() ===
          SystemProgram.programId?.toBase58()
        ) {
          // return undefined;
          // If this is the end, must be genesis customer
          // const customerAddress = await findCustomerAddress(
          //   merchantWalletAddress
          // );
          // return customerAddress?.toBase58();
        }
        return lastPage?.prevCustomerKey?.toBase58();
      },
    }
  );
}
