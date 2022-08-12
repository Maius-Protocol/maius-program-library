import { Button, ThemeIcon, UnstyledButton } from "@mantine/core";
import { Edit, Note, User } from "tabler-icons-react";
import { displayTime } from "../../utils/displayUtils";
import Link from "next/link";
import React from "react";
import { useProgram } from "../../provider/ProgramProvider";
import { useCustomerInvoiceAccount } from "../../services/customer_invoice/useCustomerInvoiceAccount";
import { useInvoiceAccount } from "../../services/invoice/useInvoiceAccount";
import invoices from "../../../pages/merchant/[merchantWalletAddress]/invoices";
import { useVaultAccount } from "../../services/vault_account/useVaultAccount";
import { useWallet } from "@solana/wallet-adapter-react";
import { mintAddress } from "../../services/payment/useCreatePayment";
import { useReclaimInvoice } from "../../services/vault_account/useReclaimInvoice";

const InvoiceRow = ({
  merchant_wallet_address,
  customer_wallet_address,
  index,
}) => {
  const { wallet } = useWallet();
  const { data: invoiceAccount } = useInvoiceAccount(
    customer_wallet_address,
    index
  );
  const { data: vaultAccount } = useVaultAccount(
    customer_wallet_address,
    index
  );

  const { mutateAsync: reclaim, isLoading } = useReclaimInvoice(
    merchant_wallet_address,
    customer_wallet_address,
    index
  );

  return (
    <>
      <td>
        <ThemeIcon
          color="blue"
          variant="light"
          style={{ width: 48, height: 48 }}
        >
          <Note size={32} />
        </ThemeIcon>
      </td>
      <td>
        <div>
          {customer_wallet_address} ({invoiceAccount?.invoiceItemCount} items)
        </div>
        <Button
          loading={isLoading}
          onClick={async () => {
            await reclaim({ amount: vaultAccount?.amount?.toString() });
          }}
          className="mt-2"
        >
          Reclaim
        </Button>
      </td>
      <td>{invoiceAccount?.paid}</td>
      <td>
        <div>Start: {invoiceAccount?.periodStart?.toNumber()}</div>
        <div>End: {invoiceAccount?.periodEnd?.toNumber()}</div>
      </td>
      <td>{invoiceAccount?.status}</td>
      {/*<td>{invoiceAccount?.total?.toNumber()}</td>*/}
      <td>{vaultAccount?.mint?.toBase58()}</td>
      <td>{vaultAccount?.amount?.toString()}</td>
      {/*<td>{vaultAccount?.amount?.valueOf()}</td>*/}
      <td />
    </>
  );
};

const InvoicePerCustomer = ({ element }) => {
  const { merchantWalletAddress } = useProgram();
  const { data: customerAccount } = useCustomerInvoiceAccount(
    merchantWalletAddress,
    element?.authority?.toBase58()
  );

  const numberOfInvoices = customerAccount?.invoiceCount?.toNumber();

  return (
    <>
      {[...Array(numberOfInvoices).keys()].map((index) => {
        return (
          <tr key={`${element?.authority?.toBase58()}_invoice_${index}`}>
            <InvoiceRow
              merchant_wallet_address={merchantWalletAddress}
              customer_wallet_address={element?.authority?.toBase58()}
              index={index}
            />
          </tr>
        );
      })}
    </>
  );
};

export default InvoicePerCustomer;
