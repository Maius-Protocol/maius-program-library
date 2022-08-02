import { Button, Group, Title } from "@mantine/core";
import React, { useEffect } from "react";
import { useCreatePricingAccount } from "../../services/pricing/useCreatePricingAccount";
import { useProgram } from "../../provider/ProgramProvider";
import { usePricesList } from "../../services/pricing/usePricesList";
import { useProductAccount } from "../../services/product/useProductAccount";
import PriceRowForm from "./_PriceRowForm";

const PriceForm = ({ product_count_index }) => {
  const { merchantWalletAddress } = useProgram();
  const {
    data: productAccount,
    isRefetching,
    refetch,
  } = useProductAccount(merchantWalletAddress, parseInt(product_count_index));

  const {
    data,
    refetch: refetchPricesList,
    fetchNextPage,
  } = usePricesList(
    merchantWalletAddress,
    product_count_index,
    productAccount?.priceCount?.toNumber()
  );

  const { mutateAsync: createPricing, isLoading: isCreating } =
    useCreatePricingAccount(
      merchantWalletAddress,
      product_count_index,
      productAccount?.priceCount?.toNumber() || 0
    );
  const elements = data?.pages?.flat() || [];

  const isLoading = isRefetching || isCreating;

  useEffect(() => {
    if (
      elements &&
      productAccount &&
      elements?.length !== productAccount?.priceCount?.toNumber()
    ) {
      fetchNextPage();
    }
  }, [elements, productAccount]);

  return (
    <>
      <Title order={3} className="mt-3">
        Price information
      </Title>
      <div className="d-flex flex-row mb-4 w-100 flex-wrap justify-content-between">
        {elements.map((item, index) => {
          // if (!item.active) {
          //   return;
          // }

          return (
            <div
              key={`price_${index}`}
              style={item.active ? {} : { opacity: 0.3 }}
              className="col-12 col-md-6 p-4"
            >
              <PriceRowForm
                product_count_index={product_count_index}
                price_count_index={index}
              />
            </div>
          );
        })}
      </div>

      <Group position="left" mt="md">
        <Button
          type="button"
          loading={isLoading}
          onClick={async () => {
            await createPricing();
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await refetch();
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await refetchPricesList();
          }}
        >
          Add another price
        </Button>
      </Group>
      <div style={{ height: "180px" }} />
    </>
  );
};

export default PriceForm;
