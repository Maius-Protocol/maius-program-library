import {
  Button,
  Card,
  Group,
  Table,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { Box, Plus } from "tabler-icons-react";
import React from "react";
import Link from "next/link";
import { useProgram } from "../../../../src/provider/ProgramProvider";

const ProductsPage = () => {
  const { routes } = useProgram();
  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>
        <ThemeIcon
          color="blue"
          variant="light"
          style={{ width: 48, height: 48 }}
        >
          <Box size={32} />
        </ThemeIcon>
      </td>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td></td>
    </tr>
  ));
  return (
    <Card className="vh-100">
      <Group className="justify-content-between align-items-center">
        <Title order={2}>Products</Title>
        <Link href={routes.merchant.products.create}>
          <Button leftIcon={<Plus size={14} />}>Add Product</Button>
        </Link>
      </Group>
      <Table horizontalSpacing="sm" verticalSpacing="sm">
        <thead>
          <tr>
            <th></th>
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
