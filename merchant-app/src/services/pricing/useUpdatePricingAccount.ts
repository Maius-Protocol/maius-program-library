import { useMutation } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../provider/ProgramProvider";
import { findPricingAddress } from "./address";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { findProductAddress } from "../product/address";
import BN from "bn.js";

interface UpdatePricingInput {
  billing_scheme: string;
  currency: string;
  unit_amount: number;
  interval: string;
  interval_count: number;
  active: boolean;
  price_type: string;
  accepted_tokens: PublicKey[];
}

export function useUpdatePricingAccount(
  merchantWalletAddress: string,
  product_count_index: number,
  price_count_index: number
) {
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgram();
  return useMutation<unknown, unknown, UpdatePricingInput>(async (props) => {
    const {
      billing_scheme = "",
      currency = "USD",
      unit_amount,
      interval_count = 31,
      interval = "day",
      price_type = "one_time",
      accepted_tokens = [],
      active = true,
    } = props;

    const product_account_address = await findProductAddress(
      merchantWalletAddress,
      product_count_index
    );
    const pricing_account_address = await findPricingAddress(
      merchantWalletAddress,
      product_account_address?.toBase58(),
      price_count_index
    );
    const transaction = await program.methods
      .updatePrice(
        billing_scheme,
        currency,
        new BN(unit_amount),
        interval,
        interval_count,
        active,
        price_type,
        accepted_tokens.map((e) => new PublicKey(e))
      )
      .accounts({
        priceAccount: pricing_account_address?.toBase58(),
        merchant: merchantWalletAddress,
        systemProgram: SystemProgram.programId,
      })
      .transaction();
    await sendTransaction(transaction, connection);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });
}
