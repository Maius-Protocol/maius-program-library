import * as anchor from "@project-serum/anchor";
import { MaiusProgramLibrary } from "../target/types/maius_program_library";
import { createCustomers } from "./customers"
import {Program, BN, Wallet, AnchorProvider} from '@project-serum/anchor';
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  SYSVAR_CLOCK_PUBKEY,
  Connection,
  clusterApiUrl
} from '@solana/web3.js';

describe("maius-program-library", () => {
  // Configure the client to use the local cluster.
  // Configure the client to use the local cluster.
  const provider = AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.MaiusProgramLibrary as Program<MaiusProgramLibrary>;

  let merchantWallet: Wallet;
  let customerWallet: Wallet;

  let customerAccount: anchor.web3.PublicKey;

  let customerBump: number; 
  
  before("Init test accounts", async () => {
    merchantWallet = new Wallet(Keypair.generate());
    customerWallet = new Wallet(Keypair.generate());
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(merchantWallet.publicKey, 3*LAMPORTS_PER_SOL),
        "confirmed"
    )
    console.log('merchantWallet', await provider.connection.getBalance(merchantWallet.publicKey))
    
  })

  it("Create a customer of merchant", async () => {

    const description = "Create a customer of merchant";

    [customerAccount, customerBump] = await PublicKey.findProgramAddress(
      [
        Buffer.from("customer_account"),
        customerWallet.publicKey.toBuffer(),
      ],
      program.programId
    );

    const transaction = await program.methods.initializeCustomer(
      description,
      customerWallet.publicKey
    ).accounts({
      customerAccount: customerAccount,
      merchantAuthority: merchantWallet.publicKey,
      systemProgram: SystemProgram.programId
    }).signers([
      merchantWallet.payer
    ]).rpc()
  
    const dataCustomerAccount = await program.account.customer.fetch(customerAccount);
    
    console.log(dataCustomerAccount)

  })
});
