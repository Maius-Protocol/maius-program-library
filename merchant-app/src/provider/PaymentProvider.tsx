import {
  createTransfer,
  encodeURL,
  fetchTransaction,
  findReference,
  FindReferenceError,
  parseURL,
  validateTransfer,
  ValidateTransferError,
} from "@solana/pay";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  ConfirmedSignatureInfo,
  Keypair,
  PublicKey,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";
import BigNumber from "bignumber.js";
import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PaymentContext, PaymentStatus } from "../hooks/usePayment";
import { Confirmations } from "../types";
import { useConfig } from "../hooks/useConfig";
import { useNavigateWithQuery } from "../hooks/useNavigateWithQuery";
import { Base64 } from "js-base64";
import { useRouter } from "next/router";
import { useProductAccount } from "../services/product/useProductAccount";
import { useMerchantAccount } from "../services/merchant/useMerchantAccount";
import { usePriceAccount } from "../services/pricing/usePriceAccount";
import { usePaymentInstruction } from "../services/payment/useCreatePayment";
import { useCustomerInvoiceAccount } from "../services/customer_invoice/useCustomerInvoiceAccount";
import { useCustomerAccount } from "../services/customer/useCustomerAccount";

export interface PaymentProviderProps {
  children: ReactNode;
}

export const PaymentProvider: FC<PaymentProviderProps> = ({ children }) => {
  const { connection } = useConnection();
  const {
    link,
    recipient,
    splToken,
    label,
    message,
    requiredConfirmations,
    connectWallet,
  } = useConfig();

  const router = useRouter();
  const { params } = router.query;
  const parsedParams = JSON.parse(params ? Base64.decode(params) : "{}");
  const merchant_wallet = parsedParams?.merchant_wallet;
  const product_count_index = parsedParams?.product_count_index;
  const price_count_index = parsedParams?.price_count_index;
  const { data: merchantAccount } = useMerchantAccount(
    merchant_wallet as string
  );
  const { data: productAccount } = useProductAccount(
    merchant_wallet,
    parseInt(product_count_index)
  );

  const { data: priceAccount } = usePriceAccount(
    merchant_wallet,
    product_count_index,
    price_count_index
  );
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState<BigNumber>();
  const [memo, setMemo] = useState<string>();
  const [reference, setReference] = useState<PublicKey>();
  const [signature, setSignature] = useState<TransactionSignature>();
  const [status, setStatus] = useState(PaymentStatus.New);
  const [confirmations, setConfirmations] = useState<Confirmations>(0);
  const navigate = useNavigateWithQuery();
  const progress = useMemo(
    () => confirmations / requiredConfirmations,
    [confirmations, requiredConfirmations]
  );
  const customer_wallet_address =
    "DZBD6BzAmMMiKCvpt1k6H74NK4eAw2JkXyHNp3tyEgjy";
  const { data: customerInvoiceAccount } = useCustomerInvoiceAccount(
    merchant_wallet,
    customer_wallet_address
  );
  const { data: customerAccount } = useCustomerAccount(
    customer_wallet_address as string
  );
  const latestIndexSubscription = customerAccount?.subscriptionCount;

  const latestIndexInvoice =
    customerInvoiceAccount?.invoiceCount?.toNumber() - 1;
  //
  // const { data: instruction } = usePaymentInstruction(
  //   merchant_wallet,
  //   customer_wallet_address,
  //   product_count_index,
  //   price_count_index,
  //   1,
  //   latestIndexInvoice + 1 || 0,
  //   0,
  //   latestIndexSubscription || 0,
  //   0
  // );

  const fetchUrl = () => {
    const url = new URL(String(link));
    const amount = priceAccount?.unitAmount;
    url.searchParams.append("recipient", recipient?.toBase58());
    url.searchParams.append("amount", amount?.toNumber()?.toFixed(6));
    url.searchParams.append("spl-token", splToken?.toBase58());
    url.searchParams.append("reference", reference?.toBase58());
    url.searchParams.append("memo", "Memo");
    url.searchParams.append("label", `${productAccount?.name} via MaiusPay`);
    url.searchParams.append("message", `test`);
    // url.searchParams.append("instruction", instruction);
    url.searchParams.append("merchant_wallet_address", merchant_wallet);
    url.searchParams.append("customer_wallet_address", customer_wallet_address);
    url.searchParams.append("product_count_index", product_count_index);
    url.searchParams.append("pricing_count_index", price_count_index);
    url.searchParams.append("quantity", 1);
    url.searchParams.append("invoice_count_index", latestIndexInvoice + 1 || 0);
    url.searchParams.append("invoice_item_count_index", 0);
    url.searchParams.append("mintAddress", splToken?.toBase58());
    url.searchParams.append(
      "subscription_count_index",
      latestIndexSubscription || 0
    );
    url.searchParams.append("subscription_item_count_index", 0);
    // url.searchParams.append("subscription_item_count_index", 0);
    return encodeURL({ link: url });
    // if (!reference) {
    //   return;
    // }
    // return encodeURL({
    //   recipient: new PublicKey("5P6KbkdP2GpUkuHi1tnbC2meToMxy52zZTiZnVzce4GJ"),
    //   amount: amount?.toNumber()?.toFixed(4),
    //   splToken: new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"),
    //   reference: reference,
    //   label: `${productAccount?.name} via MaiusPay`,
    //   message: `${merchantAccount?.logoUrl}`,
    //   memo: "ABC",
    // });
  };

  const reset = useCallback(() => {
    setAmount(undefined);
    setMemo(undefined);
    setReference(undefined);
    setSignature(undefined);
    setStatus(PaymentStatus.New);
    setConfirmations(0);
    navigate("/new", true);
  }, [navigate]);

  const generate = useCallback(() => {
    fetchUrl();
    if (status === PaymentStatus.New && !reference) {
      setReference(Keypair.generate().publicKey);
      setStatus(PaymentStatus.Pending);
      // navigate("/pending");
    }
  }, [status, reference, navigate]);

  // If there's a connected wallet, use it to sign and send the transaction
  // useEffect(() => {
  //   if (status === PaymentStatus.Pending && connectWallet && publicKey) {
  //     let changed = false;
  //     console.log("here-");
  //
  //     const run = async () => {
  //       try {
  //         const request = parseURL(url);
  //         let transaction: Transaction;
  //
  //         if ("link" in request) {
  //           const { link } = request;
  //           console.log(link);
  //           transaction = await fetchTransaction(connection, publicKey, link);
  //         } else {
  //           const { recipient, amount, splToken, reference, memo } = request;
  //           if (!amount) return;
  //
  //           transaction = await createTransfer(connection, publicKey, {
  //             recipient,
  //             amount,
  //             splToken,
  //             reference,
  //             memo,
  //           });
  //         }
  //
  //         if (!changed) {
  //           await sendTransaction(transaction, connection);
  //         }
  //       } catch (error) {
  //         // If the transaction is declined or fails, try again
  //         console.error(error);
  //         timeout = setTimeout(run, 5000);
  //       }
  //     };
  //     let timeout = setTimeout(run, 0);
  //
  //     return () => {
  //       changed = true;
  //       clearTimeout(timeout);
  //     };
  //   }
  // }, [status, connectWallet, publicKey, url, connection, sendTransaction]);

  // When the status is pending, poll for the transaction using the reference key
  // useEffect(() => {
  //   if (!(status === PaymentStatus.Pending && reference && !signature)) return;
  //   let changed = false;
  //
  //   const interval = setInterval(async () => {
  //     let signature: ConfirmedSignatureInfo;
  //     try {
  //       signature = await findReference(connection, reference);
  //
  //       if (!changed) {
  //         clearInterval(interval);
  //         setSignature(signature.signature);
  //         setStatus(PaymentStatus.Confirmed);
  //         // navigate("/confirmed", true);
  //       }
  //     } catch (error: any) {
  //       // If the RPC node doesn't have the transaction signature yet, try again
  //       if (!(error instanceof FindReferenceError)) {
  //         console.error(error);
  //       }
  //     }
  //   }, 1000);
  //
  //   return () => {
  //     changed = true;
  //     clearInterval(interval);
  //   };
  // }, [status, reference, signature, connection, navigate]);

  // When the status is confirmed, validate the transaction against the provided params
  // useEffect(() => {
  //   if (!(status === PaymentStatus.Confirmed && signature && amount)) return;
  //   let changed = false;
  //
  //   const run = async () => {
  //     try {
  //       await validateTransfer(connection, signature, {
  //         recipient,
  //         amount,
  //         splToken,
  //         reference,
  //       });
  //
  //       if (!changed) {
  //         setStatus(PaymentStatus.Valid);
  //       }
  //     } catch (error: any) {
  //       // If the RPC node doesn't have the transaction yet, try again
  //       if (
  //         error instanceof ValidateTransferError &&
  //         (error.message === "not found" || error.message === "missing meta")
  //       ) {
  //         console.warn(error);
  //         timeout = setTimeout(run, 250);
  //         return;
  //       }
  //
  //       console.error(error);
  //       setStatus(PaymentStatus.Invalid);
  //     }
  //   };
  //   let timeout = setTimeout(run, 0);
  //
  //   return () => {
  //     changed = true;
  //     clearTimeout(timeout);
  //   };
  // }, [status, signature, amount, connection, recipient, splToken, reference]);

  // When the status is valid, poll for confirmations until the transaction is finalized
  // useEffect(() => {
  //   if (!(status === PaymentStatus.Valid && signature)) return;
  //   let changed = false;
  //
  //   const interval = setInterval(async () => {
  //     try {
  //       const response = await connection.getSignatureStatus(signature);
  //       const status = response.value;
  //       if (!status) return;
  //       if (status.err) throw status.err;
  //
  //       if (!changed) {
  //         const confirmations = (status.confirmations || 0) as Confirmations;
  //         setConfirmations(confirmations);
  //
  //         if (
  //           confirmations >= requiredConfirmations ||
  //           status.confirmationStatus === "finalized"
  //         ) {
  //           clearInterval(interval);
  //           setStatus(PaymentStatus.Finalized);
  //         }
  //       }
  //     } catch (error: any) {
  //       console.log(error);
  //     }
  //   }, 250);
  //
  //   return () => {
  //     changed = true;
  //     clearInterval(interval);
  //   };
  // }, [status, signature, connection, requiredConfirmations]);

  useEffect(() => {
    generate();
  }, [splToken]);

  useEffect(() => {
    const interval = setInterval(async () => {
      let signature: ConfirmedSignatureInfo;
      try {
        signature = await findReference(connection, reference);
        console.log(signature);
        router.push("/thanks");
      } catch (error: any) {
        console.log(error);
        // If the RPC node doesn't have the transaction signature yet, try again
        if (!(error instanceof FindReferenceError)) {
          console.error(error);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [status, reference, signature, connection, navigate]);

  return (
    <PaymentContext.Provider
      value={{
        amount,
        setAmount,
        memo,
        setMemo,
        reference,
        signature,
        status,
        confirmations,
        progress,
        url: fetchUrl(),
        reset,
        generate,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
