import * as anchor from "@project-serum/anchor";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
} from "@solana/web3.js";
import { AnchorProvider, Program, Wallet } from "@project-serum/anchor";
import { MaiusProgramLibrary } from "../target/types/maius_program_library";
import { findCustomerAddress, findMerchantAddress } from "./merchant/address";
import { globalState } from "./maius-program-library";

export const provider = AnchorProvider.env();

anchor.setProvider(provider);

export const program = anchor.workspace
  .MaiusProgramLibrary as Program<MaiusProgramLibrary>;

export const getBalance = async (address: string) => {
    console.log(program.provider.connection)
  const response = await program.provider.connection.getBalance(
    new anchor.web3.PublicKey(address)
  );
  return ((response || 0) / LAMPORTS_PER_SOL).toFixed(18);
};

export const airdropAccounts = async () => {
  anchor.setProvider(provider);
  const merchantWallet = globalState.merchantWallet;
  const customerWallet = globalState.customerWallet;
  await provider.connection.confirmTransaction(
    await provider.connection.requestAirdrop(
      merchantWallet.publicKey,
      2 * LAMPORTS_PER_SOL
    ),
    "confirmed"
  );

  await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(
          customerWallet.publicKey,
          2 * LAMPORTS_PER_SOL
      ),
      "confirmed"
  );
  console.log(
    "Before merchantWallet SOL amount:",
    await getBalance(merchantWallet.publicKey.toBase58())
  );
};

export const createNewKeys = async () => {
  globalState.merchantWallet = new Wallet(Keypair.generate());
  globalState.customerWallet = new Wallet(Keypair.generate());
};
