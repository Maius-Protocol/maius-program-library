import { Button, Card, Group, Table, Title } from "@mantine/core";
import Link from "next/link";
import { Plus } from "tabler-icons-react";
import React from "react";
import { useProgram } from "../../../../src/provider/ProgramProvider";

const PaymentLinksPage = () => {
  const { routes } = useProgram();
  return (
    <Card>
      <Group className="justify-content-between align-items-center mb-4">
        <Title order={2}>Payment Links</Title>
        <Link href={routes.merchant.payment_links.create}>
          <Button leftIcon={<Plus size={14} />}>New</Button>
        </Link>
      </Group>
      {/*<Table horizontalSpacing="sm" verticalSpacing="sm">*/}
      {/*  <thead>*/}
      {/*    <tr>*/}
      {/*      <th></th>*/}
      {/*      <th>WALLET ADDRESS</th>*/}
      {/*      <th>DESCRIPTION</th>*/}
      {/*      <th>CREATED</th>*/}
      {/*      <th></th>*/}
      {/*    </tr>*/}
      {/*  </thead>*/}
      {/*</Table>*/}
    </Card>
  );
};

export default PaymentLinksPage;
