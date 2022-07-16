import * as anchor from "@project-serum/anchor";
import { Keypair, LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js";
import { AnchorProvider, Program, Wallet } from "@project-serum/anchor";
import { MaiusProgramLibrary } from "../target/types/maius_program_library";
import { findCustomerAddress, findMerchantAddress } from "./merchant/address";
import { globalState } from "./maius-program-library";

export const provider = AnchorProvider.env();

export const program = anchor.workspace
  .MaiusProgramLibrary as Program<MaiusProgramLibrary>;

export const getBalance = async (address: string) => {
  const response = await program.provider.connection.getBalance(
    new anchor.web3.PublicKey(address)
  );
  return ((response || 0) / LAMPORTS_PER_SOL).toFixed(18);
};

export const initializeMerchant = async (merchantWallet: Wallet) => {
  const address = await findMerchantAddress(merchantWallet);
  const genesisCustomer = await findCustomerAddress(merchantWallet);
  await program.methods
    .initializeMerchant(
      "MaiusPay",
      "Awesome store",
      "https://i.pravatar.cc/300"
    )
    .accounts({
      merchant: address,
      genesisCustomer: genesisCustomer,
      merchantWallet: merchantWallet.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .signers([merchantWallet.payer])
    .rpc();

  const data = await program.account.merchant.fetch(address);
  console.log("[Merchant] Create result: ", data);
  return address;
};

export const airdropAccounts = async () => {
  anchor.setProvider(provider);
  const merchantWallet = globalState.merchantWallet;
  const customerWallet = globalState.customerWallet;
  await provider.connection.confirmTransaction(
    await provider.connection.requestAirdrop(
      merchantWallet.publicKey,
      3 * LAMPORTS_PER_SOL
    ),
    "confirmed"
  );
  console.log(
    "merchantWallet",
    await provider.connection.getBalance(merchantWallet.publicKey)
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
