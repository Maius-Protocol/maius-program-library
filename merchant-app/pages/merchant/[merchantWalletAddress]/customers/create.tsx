import {
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import Link from "next/link";
import { X } from "tabler-icons-react";
import React from "react";
import { useProgram } from "../../../../src/provider/ProgramProvider";
import { useRouter } from "next/router";
import ImageDropzone from "../../../../src/pages/products/ImageDropzone";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useCreateCustomerAccount } from "../../../../src/services/customer/useCreateCustomerAccount";
import CustomerAccountForm from "../../../../src/pages/customers/_CustomerAccountForm";

const CreateCustomerPage = () => {
  const { routes, merchantWalletAddress } = useProgram();
  const router = useRouter();
  const { mutateAsync: create, isLoading } = useCreateCustomerAccount(
    merchantWalletAddress
  );
  const form = useForm({
    initialValues: {},
    validate: {},
  });

  const createCustomer = async ({ customer_wallet, description }) => {
    try {
      await create({
        description,
        customer_wallet,
      });
      await router.push(routes.merchant.customers.list);
    } catch (e) {
      showNotification({
        title: "Something went wrong!",
        message: `${e.toString()}`,
        color: "red",
      });
    }
  };
  return (
    <Card className="">
      <form
        onSubmit={form.onSubmit(async (values) => {
          await createCustomer({ ...values });
        })}
      >
        <Group className="justify-content-between align-items-center">
          <div className="d-flex flex-row align-items-center">
            <UnstyledButton>
              <X
                size={20}
                onClick={() => {
                  router.push(routes.merchant.customers.list);
                }}
              />
            </UnstyledButton>
            <Title order={3} className="m-lg-2">
              Add customer
            </Title>
          </div>
          <Button type="submit" loading={isLoading}>
            Save customer
          </Button>
        </Group>
        <Divider className="mt-3" />
        <CustomerAccountForm {...form} disabled={false} />
      </form>
    </Card>
  );
};

export default CreateCustomerPage;
