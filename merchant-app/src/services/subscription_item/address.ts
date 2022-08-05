import { PublicKey } from "@solana/web3.js";
import { programID } from "../../../config/globalVariables";
import { findSubscriptionAddress } from "../subscription/address";

export const useSubscriptionItemKey = "subscription_item";

export const findSubscriptionItemAddress = async (
  customer_wallet_address: string,
  subscription_count_index: number,
  subscription_item_count_index: number
) => {
  const subscriptionAddress = await findSubscriptionAddress(
    customer_wallet_address,
    subscription_count_index
  );
  const [address] = await PublicKey.findProgramAddress(
    [
      Buffer.from("v1"),
      Buffer.from(useSubscriptionItemKey),
      new PublicKey(subscriptionAddress?.toBase58())?.toBuffer(),
      Buffer.from(subscription_item_count_index?.toString()),
    ],
    programID
  );
  return address;
};
