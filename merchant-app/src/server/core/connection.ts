import { Connection } from "@solana/web3.js";
import { CLUSTER_ENDPOINT } from "./env";
import { localhostEndpoint } from "../../../config/globalVariables";

export const connection = new Connection(localhostEndpoint, "processed");
