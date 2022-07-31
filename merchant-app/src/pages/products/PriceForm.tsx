import { ActionIcon, Button, Divider, Group, Title } from "@mantine/core";
import React from "react";
import { useCreatePricingAccount } from "../../services/pricing/useCreatePricingAccount";
import { useProgram } from "../../provider/ProgramProvider";
import { usePricesList } from "../../services/pricing/usePricesList";
import { useProductAccount } from "../../services/product/useProductAccount";
import PriceRowForm from "./_PriceRowForm";
import { Trash } from "tabler-icons-react";

const PriceForm = ({ product_id }) => {
  const { routes, merchantWalletAddress } = useProgram();
  const {
    data: productAccount,
    isRefetching,
    refetch,
  } = useProductAccount(merchantWalletAddress, parseInt(product_id));

  const { data, isLoading: isLoadingPrices } = usePricesList(
    merchantWalletAddress,
    product_id,
    productAccount?.priceCount?.toNumber() || 0
  );

  const { mutateAsync: createPricing, isLoading: isCreating } =
    useCreatePricingAccount(
      merchantWalletAddress,
      product_id,
      productAccount?.priceCount?.toNumber() || 0
    );
  const elements = data?.pages?.flat() || [];

  const isLoading = isLoadingPrices || isRefetching || isCreating;

  return (
    <>
      <Title order={3} className="mt-3">
        Price information
      </Title>
      <div className="d-flex flex-column">
        {elements.map((item, index) => {
          return (
            <div key={`price_${index}`}>
              <PriceRowForm index={index} />
            </div>
          );
        })}

        <Group position="left" mt="md">
          <Button
            type="button"
            loading={isLoading}
            onClick={async () => {
              await createPricing();
              await refetch();
            }}
          >
            Add another price
          </Button>
        </Group>
      </div>
    </>
  );
};

export default PriceForm;
