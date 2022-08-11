import { createTransfer } from "@solana/pay";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
} from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { NextApiHandler } from "next";
import { connection } from "../core";
import { cors, rateLimit } from "../middleware";
import { findCustomerAddress } from "../../services/customer/address";
import { findMerchantAddress } from "../../services/merchant/address";
import { findCustomerInvoiceAddress } from "../../services/customer_invoice/address";
import { findInvoiceAddress } from "../../services/invoice/address";
import { findInvoiceItemAddress } from "../../services/invoice_item/address";
import { findSubscriptionAddress } from "../../services/subscription/address";
import { findSubscriptionItemAddress } from "../../services/subscription_item/address";
import { findProductAddress } from "../../services/product/address";
import { findPricingAddress } from "../../services/pricing/address";
import { AnchorProvider, Program, Wallet } from "@project-serum/anchor";
import idl from "../../../config/idl.json";
import { programID } from "../../../config/globalVariables";
import {
  findAssociatedAccountAddress,
  findEscrowAccount,
  findVaultAccountAddress,
} from "../../services/vault_account/address";
const provider = new AnchorProvider(
  connection,
  new Wallet(Keypair.generate()),
  {
    commitment: "processed",
  }
);
const program = new Program(idl, programID, provider);

interface GetResponse {
  label: string;
  icon: string;
}

const get: NextApiHandler<GetResponse> = async (request, response) => {
  const label = request.query.label;
  const message = request.query.message;
  if (!label) throw new Error("missing label");
  if (typeof label !== "string") throw new Error("invalid label");

  const icon = message;

  response.status(200).send({
    label: "Maius Pay",
    icon: icon,
  });
};

interface PostResponse {
  transaction: string;
  message?: string;
}

const post: NextApiHandler<PostResponse> = async (request, response) => {
  /*
    Transfer request params provided in the URL by the app client. In practice, these should be generated on the server,
    persisted along with an unpredictable opaque ID representing the payment, and the ID be passed to the app client,
    which will include the ID in the transaction request URL. This prevents tampering with the transaction request.
    */
  console.log("requestbody", request.body);
  console.log("requestquery", request.query);
  const accountField = request.body?.account;
  const merchant_wallet_address = request.query?.merchant_wallet_address;
  const invoice_count_index = request.query?.invoice_count_index;
  const invoice_item_count_index = request.query?.invoice_item_count_index;
  const subscription_count_index = request.query?.subscription_count_index;
  const subscription_item_count_index =
    request.query?.subscription_item_count_index;
  const product_count_index = request.query?.product_count_index;
  const pricing_count_index = request.query?.pricing_count_index;
  const mintAddress = request.query?.mintAddress;
  const quantity = request.query?.quantity;
  const customer_wallet_address = accountField;
  console.log("customerAccountAddress", customer_wallet_address);

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

  const customer_deposit_token_address = await findAssociatedAccountAddress(
    mintAddress,
    customer_wallet_address
  );

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
  const blockhash = await connection.getLatestBlockhash("finalized");
  transaction.recentBlockhash = blockhash.blockhash;
  transaction.feePayer = new PublicKey(customer_wallet_address);

  const instruction = transaction
    .serialize({
      verifySignatures: false,
      requireAllSignatures: false,
    })
    .toString("base64");

  // const instruction = request.query.instruction;
  // console.log("api", instruction);
  response.status(200).send({
    transaction: instruction,
    message: `Subscribe 🔔`,
  });
};

const index: NextApiHandler<GetResponse | PostResponse> = async (
  request,
  response
) => {
  await cors(request, response);
  await rateLimit(request, response);

  if (request.method === "GET") return get(request, response);
  if (request.method === "POST") return post(request, response);

  throw new Error(`Unexpected method ${request.method}`);
};

export default index;
