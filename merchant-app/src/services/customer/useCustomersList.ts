import { useInfiniteQuery, useQuery } from "react-query";
import { useProgram } from "../../provider/ProgramProvider";
import { useMerchantAccountKey } from "../merchant/address";
import { findCustomerAddress, useCustomerAccountKey } from "./address";
import { SystemProgram } from "@solana/web3.js";

export function useCustomersList(current_customer_key: string) {
  const { program } = useProgram();
  return useInfiniteQuery(
    [useMerchantAccountKey, current_customer_key, useCustomerAccountKey],
    async ({ prev_customer_key }) => {
      // const customerAddress = await findCustomerAddress(
      //   prev_customer_key || current_customer_key
      // );
      return await program.account.customer.fetch(
        prev_customer_key || current_customer_key
      );
    },
    {
      enabled: current_customer_key !== null && current_customer_key !== "",
      getNextPageParam: (lastPage, allPages) => {
        if (
          lastPage?.prevCustomerKey?.toBase58() ===
          SystemProgram.programId?.toBase58()
        ) {
          return undefined;
        }
        return lastPage?.prevCustomerKey?.toBase58();
      },
    }
  );
}
