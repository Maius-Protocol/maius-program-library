import { Button, Title } from "@mantine/core";
import { useCustomerInvoiceAccount } from "../../services/customer_invoice/useCustomerInvoiceAccount";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCreateCustomerInvoiceAccount } from "../../services/customer_invoice/useCreateCustomerInvoiceAccount";
import { useCreateInvoiceAccount } from "../../services/invoice/useCreateInvoiceAccount";
import { useInvoiceAccount } from "../../services/invoice/useInvoiceAccount";
import { useState } from "react";
import { useCreateInvoiceItemAccount } from "../../services/invoice_item/useCreateInvoiceItemAccount";
import { useInvoiceItemAccount } from "../../services/invoice_item/useInvoiceItemAccount";
import { useCreateSubscriptionAccount } from "../../services/subscription/useCreateSubscriptionAccount";
import { useCustomerAccount } from "../../services/customer/useCustomerAccount";
import { useSubscriptionAccount } from "../../services/subscription/useSubscriptionAccount";
import { useCreateSubscriptionItemAccount } from "../../services/subscription_item/useCreateSubscriptionItemAccount";
import { useSubscriptionItemAccount } from "../../services/subscription_item/useSubscriptionItemAccount";
import { useCreatePayment } from "../../services/payment/useCreatePayment";

const CheckoutButton = ({
  symbol,
  merchant_wallet,
  product_count_index,
  price_count_index,
  quantity,
}) => {
  const [checkoutProcessing, setCheckoutProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { wallet, connected } = useWallet();
  const customer_wallet_address = wallet?.adapter?.publicKey?.toBase58();
  const { data: customerAccount, refetch: refetchCustomerAccount } =
    useCustomerAccount(customer_wallet_address as string);

  const latestIndexSubscription = customerAccount?.subscriptionCount;
  const {
    data: customerInvoiceAccount,
    isLoading: isFetchingCustomerInvoiceAccount,
    refetch: refetchCustomerInvoiceAccount,
  } = useCustomerInvoiceAccount(
    merchant_wallet,
    wallet?.adapter?.publicKey?.toBase58()
  );

  const latestIndexInvoice =
    customerInvoiceAccount?.invoiceCount?.toNumber() - 1;

  const {
    data: invoiceAccount,
    isLoading: isFetchingInvoiceAccount,
    refetch: refetchInvoiceAccount,
  } = useInvoiceAccount(customer_wallet_address, latestIndexInvoice);

  const {
    mutateAsync: createCustomerInvoiceAccount,
    isLoading: isCreatingCustomerInvoiceAccount,
  } = useCreateCustomerInvoiceAccount(
    merchant_wallet,
    wallet?.adapter?.publicKey?.toBase58()
  );

  const {
    mutateAsync: createInvoiceAccount,
    isLoading: isCreatingInvoiceAccount,
  } = useCreateInvoiceAccount(
    merchant_wallet,
    customer_wallet_address,
    customerInvoiceAccount?.invoiceCount?.toNumber()
  );

  const {
    mutateAsync: createInvoiceItemAccount,
    isLoading: isCreatingInvoiceItemAccount,
  } = useCreateInvoiceItemAccount(
    customer_wallet_address,
    merchant_wallet,
    product_count_index,
    price_count_index,
    latestIndexInvoice
  );

  const {
    // data: lastInvoiceItem,
    isLoading: isLoadingLastInvoiceItemAccount,
    refetch: refetchLastInvoiceItem,
  } = useInvoiceItemAccount(
    customer_wallet_address,
    latestIndexInvoice,
    invoiceAccount?.invoiceItemCount
  );

  const {
    data: latestSubscriptionAccount,
    refetch: refetchLatestSubscriptionAccount,
  } = useSubscriptionAccount(
    customer_wallet_address,
    customerAccount?.subscriptionCount - 1
  );

  const {
    mutateAsync: createSubscriptionAccount,
    isLoading: isCreatingSubscriptionAccount,
  } = useCreateSubscriptionAccount(
    merchant_wallet,
    customer_wallet_address,
    latestIndexInvoice,
    customerAccount?.subscriptionCount
  );

  const {
    mutateAsync: createSubscriptionItemAccount,
    isLoading: isCreatingSubscriptionItem,
  } = useCreateSubscriptionItemAccount(
    merchant_wallet,
    customer_wallet_address,
    product_count_index,
    price_count_index,
    latestIndexInvoice
  );

  const {
    data,
    refetch: refetchLatestSubscriptionItem,
    isLoading: isLoadingLatestSubscriptionItem,
  } = useSubscriptionItemAccount(
    customer_wallet_address,
    latestIndexSubscription + 1,
    0
  );

  const { mutateAsync: payment } = useCreatePayment(
    merchant_wallet,
    customer_wallet_address,
    product_count_index,
    price_count_index,
    quantity,
    latestIndexInvoice + 1 || 0,
    0,
    latestIndexSubscription || 0,
    0
  );

  const isLoading =
    isFetchingCustomerInvoiceAccount ||
    isCreatingCustomerInvoiceAccount ||
    isCreatingInvoiceAccount ||
    isFetchingInvoiceAccount ||
    checkoutProcessing ||
    isCreatingInvoiceItemAccount ||
    isCreatingSubscriptionAccount ||
    isCreatingSubscriptionItem;

  console.log(customerAccount?.subscriptionCount);
  const disabled = !connected;
  // const checkout = async () => {
  //   setCheckoutProcessing(true);
  //   if (!customerInvoiceAccount) {
  //     console.log("Create customer invoice account");
  //     await createCustomerInvoiceAccount();
  //     await refetchCustomerInvoiceAccount();
  //   }
  //   console.log("Create invoice account");
  //   await createInvoiceAccount();
  //   const _refetchCustomerInvoiceAccount =
  //     await refetchCustomerInvoiceAccount();
  //   let _latestIndexInvoice =
  //     _refetchCustomerInvoiceAccount?.data?.invoiceCount?.toNumber() - 1;
  //   console.log("refetchCustomerInvoiceAccount", _latestIndexInvoice);
  //   let latestInvoiceAccount = await refetchInvoiceAccount();
  //   while (!latestInvoiceAccount?.data) {
  //     console.log("Retry refetchInvoiceAccount...");
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     latestInvoiceAccount = await refetchInvoiceAccount();
  //   }
  //   console.log("Proposed Invoice", latestInvoiceAccount?.data);
  //   console.log("Create Invoice Item");
  //   await createInvoiceItemAccount({
  //     invoice_item_count_index: 0,
  //     quantity: quantity,
  //   });
  //   let _lastInvoiceItemAccount = await refetchLastInvoiceItem();
  //   while (!_lastInvoiceItemAccount) {
  //     console.log("Retry refetchLastInvoiceItem...");
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     _lastInvoiceItemAccount = await refetchLastInvoiceItem();
  //   }
  //   console.log("Create Invoice Item Success", {
  //     ..._lastInvoiceItemAccount?.data,
  //     amount: _lastInvoiceItemAccount?.data?.amount?.toNumber(),
  //     quantity: _lastInvoiceItemAccount?.data?.quantity?.toNumber(),
  //   });
  //   await createSubscriptionAccount({
  //     current_period_end: new Date().valueOf(),
  //   });
  //   console.log("Create subscription");
  //   let _LatestSubscriptionAccount = await refetchLatestSubscriptionAccount();
  //   while (!_LatestSubscriptionAccount) {
  //     console.log("Retry refetchLatestSubscriptionAccount...");
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     _LatestSubscriptionAccount = await refetchLatestSubscriptionAccount();
  //   }
  //   console.log("Create Subscription Account Success", {
  //     ..._LatestSubscriptionAccount?.data,
  //   });
  //   console.log("Create subscription item");
  //   let _customerAccount = await refetchCustomerAccount();
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   await createSubscriptionItemAccount({
  //     quantity,
  //     subscription_count_index:
  //       _customerAccount?.data?.subscriptionCount?.toNumber() - 1,
  //     subscription_item_count_index:
  //       _LatestSubscriptionAccount?.data?.subscriptionItemCount || 0,
  //   });
  //   // await createSubscriptionItemAccount({
  //   //   quantity,
  //   //   subscription_count_index: 10,
  //   //   subscription_item_count_index: 0,
  //   // });
  //   let _latestSubscriptionItemAccount = await refetchLatestSubscriptionItem();
  //   while (!_latestSubscriptionItemAccount) {
  //     console.log("Retry refetchLatestSubscriptionItem...");
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     _latestSubscriptionItemAccount = await refetchLatestSubscriptionItem();
  //   }
  //   console.log(
  //     "Create Subscription item success",
  //     _latestSubscriptionItemAccount?.data
  //   );
  //   setPaymentSuccess(true);
  //   setCheckoutProcessing(false);
  // };

  const checkout = async () => {
    setCheckoutProcessing(true);
    await payment({
      quantity,
    });
    setCheckoutProcessing(false);
  };

  if (paymentSuccess) {
    return <Title className="pl-3">🎉 Thank you! 🎉</Title>;
  }

  return (
    <Button
      disabled={disabled}
      onClick={checkout}
      loading={isLoading}
      color="teal"
      size="lg"
      sx={{ flex: 1, marginLeft: "24px" }}
    >
      Checkout with {symbol}
    </Button>
  );
};

export default CheckoutButton;
