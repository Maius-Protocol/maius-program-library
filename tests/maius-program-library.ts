import * as anchor from "@project-serum/anchor";
import { Wallet } from "@project-serum/anchor";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  airdropAccounts,
  getBalance,
  provider,
} from "./shared";
// import { merchantTests } from "./merchant";
import {productTests} from "./product"

let productAccount: anchor.web3.PublicKey;
let productBump: number;

export let globalState = {
  merchantWallet: new Wallet(Keypair.generate()),
  customerWallet: new Wallet(Keypair.generate()),
  productAccount: productAccount,
  productBump: productBump,
};

describe("maius-program-library", () => {
  productTests.run();
  // merchantTests.run();
  // customerTests.run();
});
