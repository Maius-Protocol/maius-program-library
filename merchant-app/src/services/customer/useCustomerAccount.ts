import { useQuery } from "@tanstack/react-query";
import { useProgram } from "../../provider/ProgramProvider";
import { useMerchantAccountKey } from "../merchant/address";
import { findCustomerAddress, useCustomerAccountKey } from "./address";

export function useCustomerAccount(customerWalletAddress: string) {
  const { program } = useProgram();
  return useQuery(
    [useMerchantAccountKey, useCustomerAccountKey, customerWalletAddress],
    async () => {
      const customerAccountAddress = await findCustomerAddress(
        customerWalletAddress
      );
      return await program.account.customer.fetch(customerAccountAddress);
    },
    {
      enabled: customerWalletAddress !== null && customerWalletAddress !== "",
    }
  );
}
