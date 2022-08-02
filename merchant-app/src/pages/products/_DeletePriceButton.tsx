import { Button } from "@mantine/core";
import React from "react";
import { useUpdatePricingAccount } from "../../services/pricing/useUpdatePricingAccount";
import { useProgram } from "../../provider/ProgramProvider";
import { usePriceAccount } from "../../services/pricing/usePriceAccount";
import { usePricesList } from "../../services/pricing/usePricesList";
import { useProductAccount } from "../../services/product/useProductAccount";

const DeletePriceButton = ({ product_count_index, price_count_index }) => {
  const { merchantWalletAddress } = useProgram();

  const { data: productAccount } = useProductAccount(
    merchantWalletAddress,
    parseInt(product_count_index)
  );

  const { refetch } = usePricesList(
    merchantWalletAddress,
    product_count_index,
    productAccount?.priceCount?.toNumber() || 0
  );
  const { data, isRefetching } = usePriceAccount(
    merchantWalletAddress,
    product_count_index,
    price_count_index
  );
  const { mutateAsync, isLoading: isCreating } = useUpdatePricingAccount(
    merchantWalletAddress,
    parseInt(product_count_index),
    price_count_index
  );

  const isLoading = isRefetching || isCreating;

  return (
    <Button
      loading={isLoading}
      onClick={async () => {
        await mutateAsync({
          accepted_tokens: data?.acceptedTokens,
          billing_scheme: data?.billingScheme,
          currency: data?.currency,
          interval: data?.interval,
          interval_count: data?.intervalCount,
          price_type: data?.priceType,
          unit_amount: data?.unitAmount,
          active: false,
        });
        await refetch();
      }}
      color="red"
    >
      Delete
    </Button>
  );
};

export default DeletePriceButton;
