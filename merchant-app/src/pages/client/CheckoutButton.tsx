import { Button } from "@mantine/core";
import { useCustomerInvoiceAccount } from "../../services/customer_invoice/useCustomerInvoiceAccount";
import { useWallet } from "@solana/wallet-adapter-react";

const CheckoutButton = ({
  symbol,
  merchant_wallet,
  product_count_index,
  price_count_index,
}) => {
  const { wallet } = useWallet();
  const {
    data: customerInvoiceAccount,
    isLoading: isFetchingCustomerInvoiceAccount,
  } = useCustomerInvoiceAccount(merchant_wallet, wallet?.adapter?.publicKey);

  const isLoading = isFetchingCustomerInvoiceAccount;

  const checkout = async () => {
    if (!customerInvoiceAccount) {
      // await create
    }
  };

  return (
    <Button
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
