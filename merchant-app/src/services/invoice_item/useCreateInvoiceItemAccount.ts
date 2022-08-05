import { useMutation } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../../provider/ProgramProvider";
import { findInvoiceItemAddress } from "./address";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { findCustomerAddress } from "../customer/address";
import { BN } from "@project-serum/anchor";
import { findProductAddress } from "../product/address";
import { findPricingAddress } from "../pricing/address";
import { findInvoiceAddress } from "../invoice/address";

interface useCreateInvoiceItemAccountProps {
  quantity: number;
  invoice_item_count_index: number;
}

export function useCreateInvoiceItemAccount(
  customer_wallet_address: string,
  merchant_wallet_address: string,
  product_count_index: number,
  price_count_index: number,
  invoice_count_index: number
) {
  console.log(
    customer_wallet_address,
    merchant_wallet_address,
    product_count_index,
    price_count_index,
    invoice_count_index
  );
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgram();
  return useMutation<unknown, unknown, useCreateInvoiceItemAccountProps>(
    async ({ quantity, invoice_item_count_index }) => {
      const customer_account = await findCustomerAddress(
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

      const product_account_address = await findProductAddress(
        merchant_wallet_address,
        product_count_index
      );
      const pricing_account_address = await findPricingAddress(
        merchant_wallet_address,
        product_account_address?.toBase58(),
        price_count_index
      );

      const transaction = await program.methods
        .initializeInvoiceItem(
          new PublicKey(customer_account),
          invoice_account,
          new PublicKey(pricing_account_address),
          new BN(quantity)
        )
        .accounts({
          invoiceItemAccount: invoice_item_account,
          invoiceAccount: invoice_account,
          authority: customer_wallet_address,
          systemProgram: SystemProgram.programId,
        })
        .transaction();
      await sendTransaction(transaction, connection);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  );
}
