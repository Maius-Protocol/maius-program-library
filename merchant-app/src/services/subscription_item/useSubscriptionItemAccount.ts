import { useQuery } from "@tanstack/react-query";
import { useProgram } from "../../provider/ProgramProvider";
import {
  findSubscriptionAddress,
  findSubscriptionItemAddress,
  useSubscriptionItemKey,
} from "./address";

export function useSubscriptionItemAccount(
  customer_wallet_address: string,
  subscription_count_index: number,
  subscription_item_count_index: number
) {
  const { program } = useProgram();
  return useQuery(
    [
      useSubscriptionItemKey,
      customer_wallet_address,
      subscription_count_index,
      subscription_item_count_index,
    ],
    async () => {
      const subscription_item_account = await findSubscriptionItemAddress(
        customer_wallet_address,
        subscription_count_index,
        subscription_item_count_index
      );

      return await program.account.subscriptionItem.fetch(
        subscription_item_account
      );
    },
    {
      retry: false,
      enabled:
        customer_wallet_address !== null &&
        customer_wallet_address !== undefined &&
        !isNaN(subscription_count_index) &&
        !isNaN(subscription_item_count_index),
    }
  );
}
