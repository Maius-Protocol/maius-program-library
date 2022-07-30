import {
  ActionIcon,
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
import { Trash, X } from "tabler-icons-react";
import React from "react";
import { useProgram } from "../../../../src/provider/ProgramProvider";
import { useRouter } from "next/router";
import ImageDropzone from "../../../../src/pages/products/ImageDropzone";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { useCreateProduct } from "../../../../src/services/product/useCreateProduct";
import { useMerchantAccount } from "../../../../src/services/merchant/useMerchantAccount";
import ProductForm from "../../../../src/pages/products/ProductForm";

const CreateProductPage = () => {
  const { routes, merchantWalletAddress } = useProgram();
  const router = useRouter();
  const {
    data: merchantAccount,
    refetch,
    isRefetching: isFetchingMerchant,
  } = useMerchantAccount(merchantWalletAddress);
  const { mutateAsync: create, isLoading: isCreating } = useCreateProduct(
    merchantWalletAddress,
    merchantAccount?.productCount?.toNumber() || 0
  );
  const form = useForm({
    initialValues: {
      images: [],
    },
    validate: {},
  });

  const isLoading = isFetchingMerchant || isCreating;

  const createProduct = async (data) => {
    try {
      await create({ ...data });
      await refetch();
      await router.push(routes.merchant.products.list);
    } catch (e) {
      showNotification({
        title: "Something went wrong!",
        message: `${e.toString()}`,
        color: "red",
      });
    }
  };
  return (
    <Card className="vh-100">
      <form onSubmit={form.onSubmit(createProduct)}>
        <Group className="justify-content-between align-items-center">
          <div className="d-flex flex-row align-items-center">
            <UnstyledButton>
              <X
                size={20}
                onClick={() => {
                  router.push(routes.merchant.products.list);
                }}
              />
            </UnstyledButton>
            <Title order={3} className="m-lg-2">
              Add a product
            </Title>
          </div>
          <Button type="submit" loading={isLoading}>
            Save product
          </Button>
        </Group>
        <Divider className="mt-3" />
        <ProductForm {...form} />
      </form>
    </Card>
  );
};

export default CreateProductPage;
