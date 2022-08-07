import { PublicKey } from "@solana/web3.js";
import { programID } from "../../../config/globalVariables";

export const useSubscriptionKey = "subscription";

export const findSubscriptionAddress = async (
  customer_wallet_address: string,
  subscription_count_index: number
) => {
  const [address] = await PublicKey.findProgramAddress(
    [
      Buffer.from("v1"),
      Buffer.from(useSubscriptionKey),
      new PublicKey(customer_wallet_address).toBuffer(),
      Buffer.from(subscription_count_index?.toString()),
    ],
    programID
  );
  return address;
};
