import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Select,
  TextInput,
} from "@mantine/core";
import { Trash } from "tabler-icons-react";
import React from "react";
import TokenField from "./_TokenField";
import { useForm } from "@mantine/form";

const PriceRowForm = ({ index }) => {
  const form = useForm({
    initialValues: {},
  });

  const editPrice = async (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.onSubmit(editPrice)}>
      <Divider my="xs" label={`Price[${index}]`} labelPosition="center" />
      <Select
        label="Billing Scheme"
        placeholder="Pick one"
        data={[
          { value: "per_unit", label: "Per unit" },
          { value: "tiered", label: "Tiered" },
        ]}
        className="mb-2"
        onChange={(value) => {
          console.log(value);
          form.setValues({
            billing_scheme: value,
          });
        }}
      />
      <TextInput
        required
        label="Unit Amount"
        placeholder="10"
        {...form.getInputProps("unit_amount")}
        className="mb-2"
      />
      <TokenField {...form} />
      <Divider
        labelPosition="center"
        label={
          <>
            <Button color="green" type="submit">
              Save
            </Button>
            <div style={{ width: "8px" }} />
            <Button color="red">Delete</Button>
          </>
        }
      />
    </form>
  );
};

export default PriceRowForm;
