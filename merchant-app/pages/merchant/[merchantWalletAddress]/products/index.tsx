import {
  Button,
  Card,
  Group,
  Table,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { Box, Edit, Plus } from "tabler-icons-react";
import React, { useEffect } from "react";
import Link from "next/link";
import { useProgram } from "../../../../src/provider/ProgramProvider";
import { useProductsList } from "../../../../src/services/product/useProductsList";
import { useMerchantAccount } from "../../../../src/services/merchant/useMerchantAccount";
import { displayTime } from "../../../../src/utils/displayUtils";
import { useRouter } from "next/router";

const ProductsPage = () => {
  const router = useRouter();
  const { routes, merchantWalletAddress } = useProgram();
  const { data: merchantAccount } = useMerchantAccount(merchantWalletAddress);
  const { data, fetchNextPage } = useProductsList(
    merchantWalletAddress,
    merchantAccount?.productCount?.toNumber() || 0
  );
  const elements = data?.pages?.flat() || [];
  const rows = elements.map((element, index) => (
    <tr
      onClick={() => {
        router.push(routes.merchant.products.edit(index));
      }}
      key={element.name}
    >
      <td>
        <ThemeIcon
          color="blue"
          variant="light"
          style={{ width: 48, height: 48 }}
        >
          <Box size={32} />
        </ThemeIcon>
      </td>
      <td>{index}</td>
      <td>
        <div>{element.name}</div>
        <div className="text-muted">
          {element?.priceCount?.toNumber()} prices
        </div>
      </td>
      <td>{displayTime(element?.created?.toNumber())}</td>
      <td>{displayTime(element?.updated?.toNumber())}</td>{" "}
      <td>
        <Link href={routes.merchant.products.edit(index)}>
          <UnstyledButton>
            <ThemeIcon color="blue" variant="light">
              <Edit size={14} />
            </ThemeIcon>
          </UnstyledButton>
        </Link>
      </td>
    </tr>
  ));

  useEffect(() => {
    if (data?.pages?.length && merchantAccount?.productCount?.toNumber()) {
      fetchNextPage();
    }
  }, [data?.pages?.length, merchantAccount]);

  return (
    <Card className="vh-100">
      <Group className="justify-content-between align-items-center">
        <Title order={2}>Products</Title>
        <Link href={routes.merchant.products.create}>
          <Button leftIcon={<Plus size={14} />}>Add Product</Button>
        </Link>
      </Group>
      <Table highlightOnHover horizontalSpacing="sm" verticalSpacing="sm">
        <thead>
          <tr>
            <th></th>
            <th>Idx</th>
            <th>NAME</th>
            <th>CREATED</th>
            <th>UPDATED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Card>
  );
};

export default ProductsPage;
