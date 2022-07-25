import { Wallet } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { programID } from "../../../config/globalVariables";

export const useCustomerAccountKey = "customer";

export const findCustomerAddress = async (customer_wallet: string) => {
  const [address] = await PublicKey.findProgramAddress(
    [
      Buffer.from("v1"),
      Buffer.from(useCustomerAccountKey),
      new PublicKey(customer_wallet).toBuffer(),
    ],
    programID
  );
  return address;
};
