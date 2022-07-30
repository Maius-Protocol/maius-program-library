import { useRouter } from "next/router";
import { useProgram } from "../../../../src/provider/ProgramProvider";
import { useCustomerAccount } from "../../../../src/services/customer/useCustomerAccount";
import { useProductAccount } from "../../../../src/services/product/useProductAccount";
import {
  Button,
  Card,
  Divider,
  Group,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { X } from "tabler-icons-react";
import ProductForm from "../../../../src/pages/products/ProductForm";
import React, { useEffect } from "react";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import PriceForm from "../../../../src/pages/products/PriceForm";

const EditPage = () => {
  const router = useRouter();
  const { routes, merchantWalletAddress } = useProgram();
  const product_count_index = router?.query?.product_count_index;
  const { data, isRefetching } = useProductAccount(
    merchantWalletAddress,
    parseInt(product_count_index)
  );
  const form = useForm({
    initialValues: {
      images: [],
      prices: [],
    },
    validate: {},
  });

  const editProduct = () => {};

  const isLoading = isRefetching;

  useEffect(() => {
    if (data) {
      form.setValues({
        sku: data.sku,
        name: data.name,
        description: data.description,
        images: data?.images?.map((e) => ({
          url: e,
          key: randomId(),
        })),
        prices: [],
      });
    }
  }, [data]);

  return (
    <Card className="vh-100">
      <form onSubmit={form.onSubmit(editProduct)}>
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
              Edit product
            </Title>
          </div>
          <Button type="submit" loading={isLoading}>
            Save product
          </Button>
        </Group>
        <Divider className="mt-3" />
        <ProductForm {...form} />
        <PriceForm product_id={parseInt(product_count_index)} />
      </form>
    </Card>
  );
};

export default EditPage;
