import { TextInput, Title } from "@mantine/core";
import React from "react";
import { UseFormInput } from "@mantine/form/lib/use-form";

const CustomerAccountForm = ({
  getInputProps,
  disabled,
}: UseFormInput<any>) => {
  return (
    <>
      <Title order={4} className="mt-4">
        Customer information
      </Title>
      <div className="d-flex flex-column g-2 mt-2">
        <TextInput
          required
          label="Wallet Address"
          placeholder="5P6KbkdP2GpUkuHi1tnbC2meToMxy52zZTiZnVzce4GJ"
          {...getInputProps("customer_wallet")}
          className="mb-2"
          disabled={disabled}
        />
        <TextInput
          required
          label="Description"
          placeholder="This is Mr Thomas Wallet"
          {...getInputProps("description")}
          className="mb-2"
        />
      </div>
    </>
  );
};

export default CustomerAccountForm;
