import {
  Button,
  Card,
  Group,
  Table,
  ThemeIcon,
  Title,
  UnstyledButton,
} from "@mantine/core";
import Link from "next/link";
import { Edit, Plus, User } from "tabler-icons-react";
import React, { useEffect } from "react";
import { useProgram } from "../../../../src/provider/ProgramProvider";
import { useMerchantAccount } from "../../../../src/services/merchant/useMerchantAccount";
import { useCustomersList } from "../../../../src/services/customer/useCustomersList";
import { displayTime } from "../../../../src/utils/displayUtils";
import InvoicePerCustomer from "../../../../src/pages/invoices/_InvoicesPerCustomer";
import { uniqBy } from "lodash";

const InvoicesPage = () => {
  const { routes, merchantWalletAddress } = useProgram();
  const { data: merchantAccount } = useMerchantAccount(merchantWalletAddress);
  const {
    data: customersUnflat,
    hasNextPage,
    fetchNextPage,
  } = useCustomersList(merchantAccount?.currentCustomerKey?.toBase58() || "");

  const customers = uniqBy(customersUnflat?.pages?.flat() || [], (obj) => {
    return obj?.authority?.toBase58();
  });

  const rows = customers.map((element, index) => {
    return <InvoicePerCustomer key={`invoice_${index}`} element={element} />;
  });

  const lastKey = customers[customers?.length - 1]?.prevCustomerKey;

  useEffect(() => {
    if (lastKey?.toBase58()) {
      fetchNextPage();
    }
  }, [lastKey?.toBase58()]);

  return (
    <Card>
      <Group className="justify-content-between align-items-center">
        <Title order={2}>Invoices</Title>
      </Group>
      <Table highlightOnHover horizontalSpacing="sm" verticalSpacing="sm">
        <thead>
          <tr>
            <th></th>
            <th>CUSTOMER WALLET</th>
            {/*<th>PAID</th>*/}
            <th>PERIOD</th>
            <th>STATUS</th>
            <th>MINT TOKEN</th>
            <th>AMOUNT REMAINING</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Card>
  );
};

export default InvoicesPage;
