import {
  Button,
  Divider,
  Group,
  Input,
  Select,
  TextInput,
} from "@mantine/core";
import React, { useEffect } from "react";
import TokenField from "./_TokenField";
import { useForm } from "@mantine/form";
import { UnmountClosed } from "react-collapse";
import DeletePriceButton from "./_DeletePriceButton";
import { useUpdatePricingAccount } from "../../services/pricing/useUpdatePricingAccount";
import { useProgram } from "../../provider/ProgramProvider";
import { useProductAccount } from "../../services/product/useProductAccount";
import { usePriceAccount } from "../../services/pricing/usePriceAccount";
import { ExternalLink } from "tabler-icons-react";
import { Base64 } from "js-base64";

const PriceRowForm = ({ product_count_index, price_count_index }) => {
  const { merchantWalletAddress } = useProgram();

  const { refetch } = useProductAccount(
    merchantWalletAddress,
    parseInt(product_count_index)
  );

  const { mutateAsync, isLoading: isCreating } = useUpdatePricingAccount(
    merchantWalletAddress,
    parseInt(product_count_index),
    price_count_index
  );
  const { data: priceAccount, isRefetching } = usePriceAccount(
    merchantWalletAddress,
    product_count_index,
    price_count_index
  );

  const form = useForm({
    initialValues: {
      currency: "USD",
      price_type: "one_time",
    },
  });

  const editPrice = async (data) => {
    console.log(data);
    await mutateAsync({
      ...data,
      unit_amount: parseInt(data?.unit_amount),
      interval_count: parseInt(data?.interval_count),
    });
    await refetch();
  };

  const isRecurring = form.values.price_type === "recurring";

  const isLoading = isCreating || isRefetching;

  useEffect(() => {
    if (priceAccount) {
      form.setValues({
        ...form.values,
        billing_scheme: priceAccount?.billingScheme,
        currency: priceAccount?.currency,
        unit_amount: priceAccount?.unitAmount?.toNumber(),
        interval: priceAccount?.interval || "month",
        interval_count: priceAccount?.intervalCount,
        active: priceAccount?.active,
        price_type: priceAccount?.priceType,
        accepted_tokens: priceAccount?.acceptedTokens?.map((e) =>
          e?.toBase58()
        ),
      });
    }
  }, [priceAccount]);

  const params = {
    merchant_wallet: merchantWalletAddress,
    product_count_index: product_count_index,
    price_count_index: price_count_index,
  };
  const paymentUrl = `${window.location.origin}/payment/${Base64.encode(
    JSON.stringify(params)
  )}`;

  return (
    <form onSubmit={form.onSubmit(editPrice)}>
      <Divider
        my="xs"
        label={`Price[${price_count_index}]`}
        labelPosition="center"
      />
      <Select
        value={form.values.price_type}
        label="Price Type"
        placeholder="Pick one"
        data={[
          { value: "recurring", label: "Recurring" },
          { value: "one_time", label: "One Time" },
        ]}
        className="mb-2"
        onChange={(value) => {
          form.setValues({
            ...form.values,
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
          type="number"
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
              ...form.values,
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
            value={form?.values?.interval}
            onSelect={(e) => {
              form.setValues({
                ...form.values,
                interval: e?.currentTarget?.value?.toLowerCase(),
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
      <TextInput
        label="Payment URL"
        icon={<ExternalLink size={16} />}
        className="mt-3"
        value={paymentUrl}
      />
      <Divider
        labelPosition="center"
        label={
          <>
            <Button loading={isLoading} color="green" type="submit">
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
