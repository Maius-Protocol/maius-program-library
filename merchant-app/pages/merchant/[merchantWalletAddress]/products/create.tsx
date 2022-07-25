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

const CreateProductPage = () => {
  const { routes } = useProgram();
  const router = useRouter();
  const form = useForm({
    initialValues: {},
    validate: {},
  });

  const createProduct = async () => {};
  return (
    <Card className="vh-100">
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
        <Button>Save product</Button>
      </Group>
      <Divider className="mt-3" />

      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            await update({
              ...values,
            });
            await refetch();
          } catch (e) {
            showNotification({
              title: "Something went wrong!",
              message: `${e.toString()}`,
              color: "red",
            });
          }
        })}
      >
        <Title order={4} className="mt-4">
          Product information
        </Title>
        <Title order={5} className="mt-4">
          Product details
        </Title>
        <div className="d-flex flex-row g-2 mt-2">
          <div className="col-12 col-md-6 ">
            <TextInput
              required
              label="Name"
              placeholder="Maius Pay"
              {...form.getInputProps("name")}
              className="mb-2"
            />
            <TextInput
              required
              label="Description"
              placeholder="Maius Pay is a subscription service"
              {...form.getInputProps("description")}
              className="mb-2"
            />
          </div>
          <div className="col-12 col-md-6 px-4">
            <ImageDropzone />
          </div>
        </div>
      </form>
    </Card>
  );
};

export default CreateProductPage;
