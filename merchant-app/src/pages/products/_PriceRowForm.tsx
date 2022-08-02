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
import { UnmountClosed } from "react-collapse";
import { useInputState } from "@mantine/hooks";
import DeletePriceButton from "./_DeletePriceButton";

const PriceRowForm = ({ product_count_index, price_count_index }) => {
  const [priceTypeValue, setPriceTypeValue] = useInputState("one_time");
  const form = useForm({
    initialValues: {
      currency: "USD",
    },
  });

  const editPrice = async (data) => {
    console.log(data);
  };

  const isRecurring = priceTypeValue === "recurring";

  return (
    <form onSubmit={form.onSubmit(editPrice)}>
      <Divider
        my="xs"
        label={`Price[${price_count_index}]`}
        labelPosition="center"
      />
      <Select
        value={priceTypeValue}
        label="Price Type"
        placeholder="Pick one"
        data={[
          { value: "recurring", label: "Recurring" },
          { value: "one_time", label: "One Time" },
        ]}
        className="mb-2"
        onChange={(value) => {
          setPriceTypeValue(value);
          form.setValues({
            price_type: value,
          });
        }}
      />
      <Group className="mb-4">
        <TextInput
          required
          label="Price"
          placeholder="10"
          {...form.getInputProps("unit_amount")}
          sx={{ flex: 1 }}
          className="mb-2"
        />
        <Select
          required
          label="Currency"
          placeholder="Pick One"
          data={[{ value: "USD", label: "USD" }]}
          className="mb-2"
          {...form.getInputProps("currency")}
          onChange={(value) => {
            form.setValues({
              currency: value,
            });
          }}
        />
      </Group>

      <UnmountClosed isOpened={isRecurring}>
        <div className="mb-4">
          <Select
            required
            label="Interval"
            placeholder="Pick one"
            data={[
              { value: "day", label: "Day" },
              { value: "month", label: "Month" },
              { value: "year", label: "Year" },
            ]}
            className="mb-2"
            onChange={(value) => {
              form.setValues({
                interval: value,
              });
            }}
          />
          <TextInput
            required
            label="Interval Count"
            placeholder="30"
            {...form.getInputProps("interval_count")}
            className="mb-2"
          />
        </div>
      </UnmountClosed>

      <TokenField {...form} />
      <Divider
        labelPosition="center"
        label={
          <>
            <Button color="green" type="submit">
              Save
            </Button>
            <div style={{ width: "8px" }} />
            <DeletePriceButton
              product_count_index={product_count_index}
              price_count_index={price_count_index}
            />
          </>
        }
      />
    </form>
  );
};

export default PriceRowForm;
