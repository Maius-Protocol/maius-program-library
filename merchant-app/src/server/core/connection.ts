import { Connection } from "@solana/web3.js";
import { CLUSTER_ENDPOINT } from "./env";

export const connection = new Connection(
  "https://api.devnet.solana.com",
  "processed"
);
