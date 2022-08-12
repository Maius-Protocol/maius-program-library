import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../provider/ProgramProvider";
import { useMutation } from "@tanstack/react-query";
import { findInvoiceAddress } from "../invoice/address";
import { PublicKey } from "@solana/web3.js";
import {
  findAssociatedAccountAddress,
  findVaultAccountAddress,
} from "./address";
import { mintAddress } from "../payment/useCreatePayment";
import { BN } from "@project-serum/anchor";

export function useReclaimInvoice(
  merchant_wallet_address: string,
  customer_wallet_address: string,
  invoice_count_index: number
) {
  const { sendTransaction, wallet } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgram();
  return useMutation(async ({ amount }) => {
    const invoice_account_address = await findInvoiceAddress(
      customer_wallet_address,
      invoice_count_index
    );

    const vault_account = await findVaultAccountAddress(
      invoice_account_address?.toBase58()
    );
    const merchant_receive_token_address = await findAssociatedAccountAddress(
      mintAddress,
      merchant_wallet_address
    );

    const transaction = await program.methods
      .merchantWithdrawl(new BN(amount))
      .accounts({
        merchant: wallet?.adapter?.publicKey?.toBase58(),
        vaultAccount: vault_account,
        invoiceAccount: new PublicKey(invoice_account_address),
        merchantReceiveTokenAccount: merchant_receive_token_address,
      })
      .transaction();
    await sendTransaction(transaction, connection);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });
}
