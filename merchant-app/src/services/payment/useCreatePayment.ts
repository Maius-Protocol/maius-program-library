import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../provider/ProgramProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { findMerchantAddress } from "../merchant/address";
import { findCustomerAddress } from "../customer/address";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { findInvoiceAddress } from "../invoice/address";
import { findInvoiceItemAddress } from "../invoice_item/address";
import { findSubscriptionAddress } from "../subscription/address";
import { findSubscriptionItemAddress } from "../subscription_item/address";
import { findCustomerInvoiceAddress } from "../customer_invoice/address";
import { findProductAddress } from "../product/address";
import { findPricingAddress } from "../pricing/address";
import {
  findAssociatedAccountAddress,
  findEscrowAccount,
  findVaultAccountAddress,
} from "../vault_account/address";

import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

export function useCreatePayment(
  merchant_wallet_address: string,
  customer_wallet_address: string | undefined,
  product_count_index = 0,
  pricing_count_index = 0,
  quantity = 0,
  invoice_count_index = 0,
  invoice_item_count_index = 0,
  subscription_count_index = 0,
  subscription_item_count_index = 0
) {
  console.log(
    merchant_wallet_address,
    customer_wallet_address,
    product_count_index,
    pricing_count_index,
    invoice_count_index,
    quantity,
    0,
    subscription_count_index,
    0
  );

  const { sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgram();
  return useMutation(async () => {
    const customerAccountAddress = await findCustomerAddress(
      customer_wallet_address
    );

    const merchantAccountAddress = await findMerchantAddress(
      merchant_wallet_address
    );

    const customerInvoiceAccountAddress = await findCustomerInvoiceAddress(
      merchant_wallet_address,
      customer_wallet_address
    );

    const invoice_account = await findInvoiceAddress(
      customer_wallet_address,
      invoice_count_index
    );

    const invoice_item_account = await findInvoiceItemAddress(
      invoice_account?.toBase58(),
      invoice_item_count_index
    );

    const subscription_account = await findSubscriptionAddress(
      customer_wallet_address,
      subscription_count_index
    );

    const subscription_item_account = await findSubscriptionItemAddress(
      customer_wallet_address,
      subscription_count_index,
      subscription_item_count_index
    );

    const product_account_address = await findProductAddress(
      merchant_wallet_address,
      product_count_index
    );
    const pricing_account_address = await findPricingAddress(
      merchant_wallet_address,
      product_account_address?.toBase58(),
      pricing_count_index
    );

    const vault_account_address = await findVaultAccountAddress(
      invoice_account?.toBase58()
    );

    const mintAddress = "2w5vRywEzSXUX56KhGvC8DcMyhRPYnFd1jb2n1ku1hVK";

    const customer_deposit_token_address = await findAssociatedAccountAddress(
      mintAddress,
      customer_wallet_address
    );

    console.log("customer_wallet_address", customer_wallet_address)
    console.log("customer_deposit_token_address", customer_deposit_token_address.toBase58())

    const merchant_receive_token_address = await findAssociatedAccountAddress(
      mintAddress,
      merchant_wallet_address
    );

    const escrow_account = await findEscrowAccount(invoice_account?.toBase58());

    let transaction = await program.methods
      .payment(quantity)
      .accounts({
        merchantAccount: merchantAccountAddress,
        customerAccount: customerAccountAddress,
        customerInvoiceAccount: customerInvoiceAccountAddress,
        invoiceAccount: invoice_account,
        invoiceItemAccount: invoice_item_account,
        priceAccount: pricing_account_address,
        subscriptionAccount: subscription_account,
        subscriptionItemAccount: subscription_item_account,
        mint: new PublicKey(mintAddress),
        vaultAccount: vault_account_address,
        customerDepositTokenAccount: customer_deposit_token_address,
        merchantReceiveTokenAccount: merchant_receive_token_address,
        // escrowAccount: escrow_account,
        customerWallet: customer_wallet_address,
        merchantWallet: merchant_wallet_address,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
      })
      .transaction();

    // const blockhash = await connection.getLatestBlockhash("finalized");
    // transaction.recentBlockhash = blockhash.blockhash;
    // transaction.feePayer = new PublicKey(customer_wallet_address);
    await sendTransaction(transaction, connection);
  
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // return transaction
    //   .serialize({
    //     verifySignatures: false,
    //     requireAllSignatures: false,
    //   })
    //   .toString("base64");
  });
}
