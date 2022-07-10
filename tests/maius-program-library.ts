import * as anchor from "@project-serum/anchor";
import { Wallet } from "@project-serum/anchor";
import { customerTests } from "./customers";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { MaiusProgramLibrary } from "../target/types/maius_program_library";
import {Program, BN, Wallet, AnchorProvider} from '@project-serum/anchor';
import {
  airdropAccounts,
  getBalance,
  initializeMerchant,
  provider,
} from "./shared";
import { merchantTests } from "./merchant";

export let globalState = {
  merchantWallet: new Wallet(Keypair.generate()),
  customerWallet: new Wallet(Keypair.generate()),
};

  const program = anchor.workspace.MaiusProgramLibrary as Program<MaiusProgramLibrary>;

  let merchantWallet: Wallet;
  let customerWallet: Wallet;

  let customerAccount: anchor.web3.PublicKey;
  let customerBump: number; 
  
  const getBalance = async (address: string) => {
    const response = await program.provider.connection.getBalance(new anchor.web3.PublicKey(address))
    return ((response || 0) / LAMPORTS_PER_SOL).toFixed(18)
  }

  before("Init test accounts", async () => {
    merchantWallet = new Wallet(Keypair.generate());
    customerWallet = new Wallet(Keypair.generate());
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(merchantWallet.publicKey, 3*LAMPORTS_PER_SOL),
        "confirmed"
    )
    console.log('merchantWallet', await provider.connection.getBalance(merchantWallet.publicKey));
    console.log('Before merchantWallet SOL amount:', await getBalance(merchantWallet.publicKey.toBase58()));
  })


  it("Create a customer of merchant", async () => {

    const description = "Create a customer of merchant";

    [customerAccount, customerBump] = await PublicKey.findProgramAddress(
      [
        Buffer.from("customer"),
        customerWallet.publicKey.toBuffer(),
      ],
      program.programId
    );
      await program.methods.initializeCustomer(
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
      console.log('Create', dataCustomerAccount.description)
  })

  it("Update customer description", async () => {
    await program.methods.updateCustomer(
      "Updated description"
    ).accounts({
      customerAccount: customerAccount,
      merchantAuthority: merchantWallet.publicKey,
      systemProgram: SystemProgram.programId
    }).signers([
      merchantWallet.payer
    ]).rpc()

    const dataCustomerAccount = await program.account.customer.fetch(customerAccount);
    console.log('After Update: ', dataCustomerAccount.description)
  })

  it("Delete customer", async () => {
    console.log('Before merchantWallet SOL amount: ', await getBalance(merchantWallet.publicKey.toBase58()))
    await program.methods.deleteCustomer(
    ).accounts({
      customerAccount: customerAccount,
      merchantAuthority: merchantWallet.publicKey,
      systemProgram: SystemProgram.programId
    }).signers([
      merchantWallet.payer
    ]).rpc()
    try {
      const dataCustomerAccount = await program.account.customer.fetch(customerAccount);
      throw new Error('Should not be deleteable')
    } catch (e) {
      console.log('After merchantWallet SOL amount:', await getBalance(merchantWallet.publicKey.toBase58()));
    }
  })
});
