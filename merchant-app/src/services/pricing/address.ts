import { PublicKey } from "@solana/web3.js";
import { programID } from "../../../config/globalVariables";
import { BN } from "@project-serum/anchor";

export const usePricingKey = "product";

export const findPricingAddress = async (
  merchant_wallet: string,
  product_address: string
) => {
  const [address] = await PublicKey.findProgramAddress(
    [Buffer.from("v1")],
    programID
  );
  return address;
};
