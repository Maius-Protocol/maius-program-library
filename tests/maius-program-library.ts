import * as anchor from "@project-serum/anchor";
import { Wallet } from "@project-serum/anchor";
import { customerTests } from "./customers";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
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

describe("maius-program-library", () => {
  // merchantTests.run();
  // customerTests.run();
});
