import {
  ActionIcon,
  Button,
  Group,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { Trash } from "tabler-icons-react";
import { randomId } from "@mantine/hooks";
import React from "react";
import { UseFormReturnType } from "@mantine/form/lib/types";

const ProductForm = (form: UseFormReturnType<any>) => {
  return (
    <>
      <Title order={3} className="mt-4">
        Product information
      </Title>
      <Title order={5} className="mt-4">
        Basic Information
      </Title>
      <div className="d-flex flex-column">
        <TextInput
          required
          label="SKU"
          placeholder="MUSIC_001"
          {...form.getInputProps("sku")}
          className="mb-2"
        />
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
      <Title order={5} className="mt-4">
        Images
      </Title>
      <div className="d-flex flex-column">
        {form.values.images.map((item, index) => {
          return (
            <Group key={item.key} align="center" mb="xs">
              <TextInput
                label={`Image[${index}]`}
                placeholder="https://source.unsplash.com/random"
                required
                sx={{ flex: 1 }}
                {...form.getInputProps(`images.${index}.url`)}
              />

              <ActionIcon
                color="red"
                className="mt-3"
                onClick={() => form.removeListItem("images", index)}
              >
                <Trash size={16} />
              </ActionIcon>
            </Group>
          );
        })}
        <Group position="left" mt="md">
          <Button
            type="button"
            onClick={() =>
              form.insertListItem("images", {
                url: "",
                key: randomId(),
              })
            }
          >
            Add Image
          </Button>
        </Group>
      </div>
      <Title order={3} className="mt-3">
        Price information
      </Title>
      <div className="d-flex flex-column">
        {form.values.prices.map((item, index) => {
          return (
            <Group key={item.key} align="center" mb="xs">
              <Select
                label="Your favorite framework/library"
                placeholder="Pick one"
                data={[
                  { value: "react", label: "React" },
                  { value: "ng", label: "Angular" },
                  { value: "svelte", label: "Svelte" },
                  { value: "vue", label: "Vue" },
                ]}
                {...form.getInputProps(`prices.${index}.currency`)}
              />

              <ActionIcon
                color="red"
                className="mt-3"
                onClick={() => form.removeListItem("prices", index)}
              >
                <Trash size={16} />
              </ActionIcon>
            </Group>
          );
        })}
        <Group position="left" mt="md">
          <Button
            type="button"
            onClick={() =>
              form.insertListItem("prices", {
                url: "",
                key: randomId(),
              })
            }
          >
            Add another price
          </Button>
        </Group>
      </div>
    </>
  );
};

export default ProductForm;
