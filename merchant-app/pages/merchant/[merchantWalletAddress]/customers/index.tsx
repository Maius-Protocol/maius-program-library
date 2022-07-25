import { useProgram } from "../../../../src/provider/ProgramProvider";
import {
  Button,
  Card,
  Group,
  Table,
  ThemeIcon,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { Box, Edit, Plus, User } from "tabler-icons-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useCustomersList } from "../../../../src/services/customer/useCustomersList";
import { useMerchantAccount } from "../../../../src/services/merchant/useMerchantAccount";
import { displayTime } from "../../../../src/utils/displayUtils";

const CustomersPage = () => {
  const { routes, merchantWalletAddress } = useProgram();
  const { data: merchantAccount } = useMerchantAccount(merchantWalletAddress);
  const { data, hasNextPage, fetchNextPage } = useCustomersList(
    merchantAccount?.currentCustomerKey?.toBase58() || ""
  );
  const elements = data?.pages?.flat() || [];

  const rows = elements.map((element) => {
    return (
      <tr key={element?.authority?.toBase58()}>
        <td>
          <ThemeIcon
            color="blue"
            variant="light"
            style={{ width: 48, height: 48 }}
          >
            <User size={32} />
          </ThemeIcon>
        </td>
        <td>{element?.authority?.toBase58()}</td>
        <td>{element?.description}</td>
        <td>{displayTime(element?.created?.toNumber())}</td>
        <td>
          <Link
            href={
              routes.merchant.customers.detail(element?.authority?.toBase58())
                .edit
            }
          >
            <UnstyledButton>
              <ThemeIcon color="blue" variant="light">
                <Edit size={14} />
              </ThemeIcon>
            </UnstyledButton>
          </Link>
        </td>
      </tr>
    );
  });

  const lastKey = elements[elements?.length - 1]?.prevCustomerKey;

  useEffect(() => {
    if (lastKey) {
      fetchNextPage();
    }
  }, [lastKey]);

  return (
    <Card className="vh-100">
      <Group className="justify-content-between align-items-center mb-4">
        <Title order={2}>Customers</Title>
        <Link href={routes.merchant.customers.create}>
          <Button leftIcon={<Plus size={14} />}>Add Customer</Button>
        </Link>
      </Group>
      <Table horizontalSpacing="sm" verticalSpacing="sm">
        <thead>
          <tr>
            <th></th>
            <th>WALLET ADDRESS</th>
            <th>DESCRIPTION</th>
            <th>CREATED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Card>
  );
};

export default CustomersPage;
