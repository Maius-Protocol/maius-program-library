import { PublicKey } from "@solana/web3.js";
import { program } from "../shared";
import { Wallet } from "@project-serum/anchor";

export const findMerchantAddress = async (merchant_wallet: Wallet) => {
  const [address] = await PublicKey.findProgramAddress(
    [
      Buffer.from("v1"),
      Buffer.from("merchant"),
      merchant_wallet.publicKey.toBuffer(),
    ],
    program.programId
  );
  return address;
};

export const findCustomerAddress = async (customer_wallet: Wallet) => {
  const [address] = await PublicKey.findProgramAddress(
    [
      Buffer.from("v1"),
      Buffer.from("customer"),
      customer_wallet.publicKey.toBuffer(),
    ],
    program.programId
  );
  return address;
};
