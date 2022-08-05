import { Button } from "@mantine/core";
import { useCustomerInvoiceAccount } from "../../services/customer_invoice/useCustomerInvoiceAccount";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCreateCustomerInvoiceAccount } from "../../services/customer_invoice/useCreateCustomerInvoiceAccount";
import { useCreateInvoiceAccount } from "../../services/invoice/useCreateInvoiceAccount";
import { useInvoiceAccount } from "../../services/invoice/useInvoiceAccount";
import { useState } from "react";
import { useCreateInvoiceItemAccount } from "../../services/invoice_item/useCreateInvoiceItemAccount";

const CheckoutButton = ({
  symbol,
  merchant_wallet,
  product_count_index,
  price_count_index,
  quantity,
}) => {
  const [checkoutProcessing, setCheckoutProcessing] = useState(false);
  const { wallet, connected } = useWallet();
  const customer_wallet_address = wallet?.adapter?.publicKey?.toBase58();
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

  const isLoading =
    isFetchingCustomerInvoiceAccount ||
    isCreatingCustomerInvoiceAccount ||
    isCreatingInvoiceAccount ||
    isFetchingInvoiceAccount ||
    checkoutProcessing ||
    isCreatingInvoiceItemAccount;

  const disabled = !connected;
  const checkout = async () => {
    setCheckoutProcessing(true);
    if (!customerInvoiceAccount) {
      console.log("Create customer invoice account");
      await createCustomerInvoiceAccount();
      await refetchCustomerInvoiceAccount();
    }
    console.log("Create invoice account");
    await createInvoiceAccount();
    const _refetchCustomerInvoiceAccount =
      await refetchCustomerInvoiceAccount();
    let _latestIndexInvoice =
      _refetchCustomerInvoiceAccount?.data?.invoiceCount?.toNumber() - 1;
    console.log("refetchCustomerInvoiceAccount", _latestIndexInvoice);
    let latestInvoiceAccount = await refetchInvoiceAccount();
    while (!latestInvoiceAccount?.data) {
      console.log("Retry refetchInvoiceAccount...");
      await new Promise((resolve) => setTimeout(resolve, 500));
      latestInvoiceAccount = await refetchInvoiceAccount();
    }
    console.log("Proposed Invoice", latestInvoiceAccount?.data);
    console.log("Create Invoice Item");
    await createInvoiceItemAccount({
      invoice_item_count_index: 0,
      quantity: quantity,
    });
    console.log("Create Invoice Item Success");
    setCheckoutProcessing(false);
  };

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
