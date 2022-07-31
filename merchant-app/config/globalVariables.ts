import { PublicKey } from "@solana/web3.js";
import idl from "./idl.json";

export const programID = new PublicKey(idl.metadata.address);

export const idlJSON = idl;

export const localhostEndpoint = "http://0.0.0.0:8899";

export const supportedTokens = ["USDC", "bUSD", "USDT", "SOL", "KNC"];

export const opts = {
  preflightCommitment: "processed",
};
