import { Button } from "@mantine/core";
import { useCustomerInvoiceAccount } from "../../services/customer_invoice/useCustomerInvoiceAccount";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCreateCustomerInvoiceAccount } from "../../services/customer_invoice/useCreateCustomerInvoiceAccount";
import { useCreateInvoiceAccount } from "../../services/invoice/useCreateInvoiceAccount";

const CheckoutButton = ({
  symbol,
  merchant_wallet,
  product_count_index,
  price_count_index,
}) => {
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

  console.log(customerInvoiceAccount);
  const isLoading =
    isFetchingCustomerInvoiceAccount ||
    isCreatingCustomerInvoiceAccount ||
    isCreatingInvoiceAccount;
  const disabled = !connected;
  const checkout = async () => {
    if (!customerInvoiceAccount) {
      console.log("Create customer invoice account");
      await createCustomerInvoiceAccount();
      await refetchCustomerInvoiceAccount();
    }
    console.log("Create invoice account");
    await createInvoiceAccount();
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
