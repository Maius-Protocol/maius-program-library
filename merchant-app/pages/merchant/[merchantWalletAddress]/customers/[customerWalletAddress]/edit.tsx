import { useRouter } from "next/router";
import { useProgram } from "../../../../../src/provider/ProgramProvider";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import {
  Button,
  Card,
  Divider,
  Group,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { X } from "tabler-icons-react";
import CustomerAccountForm from "../../../../../src/pages/customers/_CustomerAccountForm";
import React, { useEffect } from "react";
import { useEditCustomerAccount } from "../../../../../src/services/customer/useEditCustomerAccount";
import { useCustomerAccount } from "../../../../../src/services/customer/useCustomerAccount";

const EditCustomerAccountPage = () => {
  const router = useRouter();
  const { routes } = useProgram();
  const customerWalletAddress = router?.query?.customerWalletAddress;
  const { data } = useCustomerAccount(customerWalletAddress as string);
  const { mutateAsync: update, isLoading } = useEditCustomerAccount(
    customerWalletAddress
  );
  const form = useForm({
    initialValues: {},
    validate: {},
  });

  const updateCustomer = async ({ description }) => {
    try {
      await update({
        description,
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

  useEffect(() => {
    if (data) {
      form.setValues({
        customer_wallet: customerWalletAddress,
        description: data?.description,
      });
    }
  }, [data]);
  return (
    <Card className="">
      <form
        onSubmit={form.onSubmit(async (values) => {
          await updateCustomer({ ...values });
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
              Update customer
            </Title>
          </div>
          <Button type="submit" loading={isLoading}>
            Save customer
          </Button>
        </Group>
        <Divider className="mt-3" />
        <CustomerAccountForm {...form} disabled={true} />
      </form>
    </Card>
  );
};

export default EditCustomerAccountPage;
