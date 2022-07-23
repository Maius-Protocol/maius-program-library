import { PublicKey } from "@solana/web3.js";
import { programID } from "../../../config/globalVariables";

export const useMerchantAccountKey = "merchant";

export const findMerchantAddress = async (merchant_wallet: string) => {
  const [address] = await PublicKey.findProgramAddress(
    [
      Buffer.from("v1"),
      Buffer.from(useMerchantAccountKey),
      new PublicKey(merchant_wallet).toBuffer(),
    ],
    programID
  );
  return address;
};
