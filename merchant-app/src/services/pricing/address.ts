import { PublicKey } from "@solana/web3.js";
import { programID } from "../../../config/globalVariables";
import { BN } from "@project-serum/anchor";

export const usePricingKey = "price";

export const findPricingAddress = async (
  merchant_wallet: string,
  product_account_address: string,
  price_count_index: number
) => {
  const [address] = await PublicKey.findProgramAddress(
    [
      Buffer.from("v1"),
      Buffer.from(usePricingKey),
      new PublicKey(merchant_wallet)?.toBuffer(),
      new PublicKey(product_account_address)?.toBuffer(),
      Buffer.from(price_count_index?.toString()),
    ],
    programID
  );
  return address;
};
