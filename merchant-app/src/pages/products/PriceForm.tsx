import { ActionIcon, Button, Group, Switch, Title } from "@mantine/core";
import TokenField from "./_TokenField";
import { Trash } from "tabler-icons-react";
import { randomId } from "@mantine/hooks";
import React from "react";
import { useForm } from "@mantine/form";
import { useCreatePricingAccount } from "../../services/pricing/useCreatePricingAccount";
import { useMerchantAccount } from "../../services/merchant/useMerchantAccount";
import { useProgram } from "../../provider/ProgramProvider";

const PriceForm = ({ product_id }) => {
  const { routes, merchantWalletAddress } = useProgram();
  const {
    data: merchantAccount,
    refetch,
    isRefetching: isFetchingMerchant,
  } = useMerchantAccount(merchantWalletAddress);
  const formCreatePrice = useForm({
    initialValues: {},
    validate: {},
  });
  const { mutateAsync: createPricing, isLoading } = useCreatePricingAccount(
    merchantWalletAddress,
    product_id
  );

  const createPrice = async () => {
    await createPricing();
  };
  return (
    <>
      <Title order={3} className="mt-3">
        Price information
      </Title>
      <div className="d-flex flex-column">
        {/*{form.values.prices.map((item, index) => {*/}
        {/*  return (*/}
        {/*    <Group key={item.key} align="center" mb="xs">*/}
        {/*      <div style={{ flex: 1 }}>*/}
        {/*        <Switch></Switch>*/}
        {/*        <TokenField {...form} index={index} />*/}
        {/*      </div>*/}
        {/*      <ActionIcon*/}
        {/*        color="red"*/}
        {/*        className="mt-3"*/}
        {/*        onClick={() => form.removeListItem("prices", index)}*/}
        {/*      >*/}
        {/*        <Trash size={16} />*/}
        {/*      </ActionIcon>*/}
        {/*    </Group>*/}
        {/*  );*/}
        {/*})}*/}

        <Group position="left" mt="md">
          <Button type="button" onClick={createPricing}>
            Add another price
          </Button>
        </Group>
      </div>
    </>
  );
};

export default PriceForm;
