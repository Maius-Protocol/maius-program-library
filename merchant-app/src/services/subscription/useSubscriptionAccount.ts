import { useQuery } from "@tanstack/react-query";
import { useProgram } from "../../provider/ProgramProvider";
import { findSubscriptionAddress, useSubscriptionKey } from "./address";

export function useSubscriptionAccount(
  customer_wallet_address: string,
  subscription_count_index: number
) {
  const { program } = useProgram();
  return useQuery(
    [useSubscriptionKey, customer_wallet_address, subscription_count_index],
    async () => {
      const subscription_account = await findSubscriptionAddress(
        customer_wallet_address,
        subscription_count_index
      );

      return await program.account.subscription.fetch(subscription_account);
    },
    {
      retry: false,
      enabled:
        customer_wallet_address !== null &&
        customer_wallet_address !== undefined &&
        subscription_count_index !== null &&
        !isNaN(subscription_count_index),
    }
  );
}
