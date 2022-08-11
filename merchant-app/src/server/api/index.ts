import { createTransfer } from "@solana/pay";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
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
import { AnchorProvider, Program } from "@project-serum/anchor";
import idl from "../../../config/idl.json";
import { programID } from "../../../config/globalVariables";

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
  // const recipientField = request.query.recipient;
  // if (!recipientField) throw new Error("missing recipient");
  // if (typeof recipientField !== "string") throw new Error("invalid recipient");
  // const recipient = new PublicKey(recipientField);
  //
  // const amountField = request.query.amount;
  // if (!amountField) throw new Error("missing amount");
  // if (typeof amountField !== "string") throw new Error("invalid amount");
  // const amount = new BigNumber(amountField);
  //
  // const splTokenField = request.query["spl-token"];
  // if (splTokenField && typeof splTokenField !== "string")
  //   throw new Error("invalid spl-token");
  // // const splToken = splTokenField ? new PublicKey(splTokenField) : undefined;
  // const splToken = new PublicKey(
  //   "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
  // );
  //
  // const referenceField = request.query.reference;
  // if (!referenceField) throw new Error("missing reference");
  // if (typeof referenceField !== "string") throw new Error("invalid reference");
  // const reference = new PublicKey(referenceField);
  //
  // const memoParam = request.query.memo;
  // if (memoParam && typeof memoParam !== "string")
  //   throw new Error("invalid memo");
  // const memo = memoParam || undefined;
  //
  // const messageParam = request.query.message;
  // if (messageParam && typeof messageParam !== "string")
  //   throw new Error("invalid message");
  // const message = messageParam || undefined;
  //
  // // Account provided in the transaction request body by the wallet.
  // const accountField = request.body?.account;
  // if (!accountField) throw new Error("missing account");
  // if (typeof accountField !== "string") throw new Error("invalid account");
  // const account = new PublicKey(accountField);
  //
  // console.log({
  //   accountField,
  //   recipient,
  //   amount,
  //   splToken,
  //   reference,
  //   memo,
  // });
  // // Compose a simple transfer transaction to return. In practice, this can be any transaction, and may be signed.
  // let transaction = await createTransfer(connection, account, {
  //   recipient,
  //   amount,
  //   splToken,
  //   reference,
  //   memo,
  // });
  //
  // transaction = Transaction.from(
  //   transaction.serialize({
  //     verifySignatures: false,
  //     requireAllSignatures: false,
  //   })
  // );
  //
  // const serialized = transaction.serialize({
  //   verifySignatures: false,
  //   requireAllSignatures: false,
  // });
  // const base64 = serialized.toString("base64");
  // const {
  //   merchant_wallet_address,
  //   customer_wallet_address,
  //   product_count_index = 0,
  //   pricing_count_index = 0,
  //   quantity = 0,
  //   invoice_count_index = 0,
  //   invoice_item_count_index = 0,
  //   subscription_count_index = 0,
  //   subscription_item_count_index = 0,
  // } = request.query;
  //
  // const customerAccountAddress = await findCustomerAddress(
  //   customer_wallet_address
  // );
  //
  // const merchantAccountAddress = await findMerchantAddress(
  //   merchant_wallet_address
  // );
  //
  // const customerInvoiceAccountAddress = await findCustomerInvoiceAddress(
  //   merchant_wallet_address,
  //   customer_wallet_address
  // );
  //
  // const invoice_account = await findInvoiceAddress(
  //   customer_wallet_address,
  //   invoice_count_index
  // );
  //
  // const invoice_item_account = await findInvoiceItemAddress(
  //   invoice_account?.toBase58(),
  //   invoice_item_count_index
  // );
  //
  // const subscription_account = await findSubscriptionAddress(
  //   customer_wallet_address,
  //   subscription_count_index
  // );
  //
  // const subscription_item_account = await findSubscriptionItemAddress(
  //   customer_wallet_address,
  //   subscription_count_index,
  //   subscription_item_count_index
  // );
  //
  // const product_account_address = await findProductAddress(
  //   merchant_wallet_address,
  //   product_count_index
  // );
  // const pricing_account_address = await findPricingAddress(
  //   merchant_wallet_address,
  //   product_account_address?.toBase58(),
  //   pricing_count_index
  // );
  //
  // const provider = new AnchorProvider(connection, wallet, {
  //   commitment: "processed",
  // });
  // const program = new Program(idl, programID, provider);
  //
  // let transaction = await program.methods
  //   .payment(customerAccountAddress, pricing_account_address, quantity)
  //   .accounts({
  //     merchantAccount: merchantAccountAddress,
  //     customerAccount: customerAccountAddress,
  //     customerInvoiceAccount: customerInvoiceAccountAddress,
  //     invoiceAccount: invoice_account,
  //     invoiceItemAccount: invoice_item_account,
  //     priceAccount: pricing_account_address,
  //     // subscriptionAccount: subscription_account,
  //     // subscriptionItemAccount: subscription_item_account,
  //     customerWallet: customer_wallet_address,
  //     merchantWallet: merchant_wallet_address,
  //     systemProgram: SystemProgram.programId,
  //   })
  //   .transaction();
  // const blockhash = await connection.getLatestBlockhash("finalized");
  // transaction.recentBlockhash = blockhash.blockhash;
  // transaction.feePayer = new PublicKey(customer_wallet_address);
  const instruction = request.query.instruction;
  console.log("api", instruction);
  response.status(200).send({
    transaction: instruction,
    message: "okay",
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
