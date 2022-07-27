import { PublicKey } from "@solana/web3.js";
import { programID } from "../../../config/globalVariables";
import { BN } from "@project-serum/anchor";

export const useProductKey = "product";

export const findProductAddress = async (
  merchant_wallet: string,
  product_count_index: number
) => {
  const [address] = await PublicKey.findProgramAddress(
    [
      Buffer.from("v1"),
      Buffer.from(useProductKey),
      new PublicKey(merchant_wallet).toBuffer(),
      Buffer.from(product_count_index?.toString()),
    ],
    programID
  );
  return address;
};
