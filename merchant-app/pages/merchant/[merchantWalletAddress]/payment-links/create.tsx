import {
  Button,
  Card,
  Group,
  Input,
  NumberInput,
  Select,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { ExternalLink, Plus } from "tabler-icons-react";
import React, { useEffect } from "react";
import { useProductsList } from "../../../../src/services/product/useProductsList";
import { useProgram } from "../../../../src/provider/ProgramProvider";
import { useMerchantAccount } from "../../../../src/services/merchant/useMerchantAccount";
import { usePriceAccount } from "../../../../src/services/pricing/usePriceAccount";
import { UnmountClosed } from "react-collapse";
import { useInputState } from "@mantine/hooks";
import { usePricesList } from "../../../../src/services/pricing/usePricesList";
import { Base64 } from "js-base64";

const CreatePaymentLinkPage = () => {
  const { routes, merchantWalletAddress } = useProgram();
  const [selectedProduct, setSelectedProduct] = useInputState(undefined);
  const [selectedPricing, setSelectedPricing] = useInputState(undefined);
  const [paymentUrl, setPaymentUrl] = useInputState(undefined);
  const { data: merchantAccount } = useMerchantAccount(merchantWalletAddress);
  const { data, fetchNextPage } = useProductsList(
    merchantWalletAddress,
    merchantAccount?.productCount?.toNumber() || 0
  );
  const products = data?.pages?.flat() || [];
  const selectedProductIndex = products?.findIndex(
    (s) => s?.name === selectedProduct
  );
  const selectedProductData = products?.find(
    (s) => s?.name === selectedProduct
  );
  const { data: pricesList, fetchNextPage: fetchNextPricing } = usePricesList(
    merchantWalletAddress,
    selectedProductIndex,
    products?.[selectedProductIndex]?.priceCount?.toNumber()
  );

  const prices = pricesList?.pages?.flat() || [];

  const priceOptions = prices?.map((p, index) => {
    return {
      label: `${p?.unitAmount?.toNumber()} ${p?.currency}`,
      value: index,
    };
  });

  const createPaymentUrl = () => {
    const params = {
      merchant_wallet: merchantWalletAddress,
      product_count_index: selectedProductIndex,
      price_count_index: selectedPricing,
    };
    setPaymentUrl(
      `${window.location.origin}/payment/${Base64.encode(
        JSON.stringify(params)
      )}`
    );
  };

  useEffect(() => {
    if (data?.pages?.length && merchantAccount?.productCount?.toNumber()) {
      fetchNextPage();
    }
  }, [data?.pages?.length, merchantAccount]);

  useEffect(() => {
    if (
      products &&
      selectedProductData &&
      products?.length !== selectedProductData?.priceCount?.toNumber()
    ) {
      fetchNextPricing();
    }
  }, [products, selectedProductData]);

  console.log(selectedPricing);

  return (
    <Card style={{ minHeight: "100vh" }}>
      <div>
        <Group className="justify-content-between align-items-center mb-4">
          <Title order={2}>Create Payment Link</Title>
        </Group>
        <Select
          dropdownPosition="bottom"
          placeholder="Pick one"
          data={products?.map((p, index) => {
            return {
              label: p?.name,
              value: index,
            };
          })}
          onSelect={setSelectedProduct}
          value={selectedProduct}
          className="mb-2"
        />
        <UnmountClosed isOpened={selectedProduct !== undefined}>
          <Select
            label="Price"
            dropdownPosition="bottom"
            placeholder="Select pricing"
            value={selectedPricing}
            onSelect={(value) => {
              setSelectedPricing(
                priceOptions?.findIndex(
                  (option) => option?.label === value?.currentTarget?.value
                )
              );
            }}
            data={priceOptions}
          />
        </UnmountClosed>

        <Button onClick={createPaymentUrl} className="mt-3">
          Create Link
        </Button>

        <UnmountClosed isOpened={paymentUrl !== undefined}>
          <Input
            icon={<ExternalLink size={16} />}
            className="mt-3"
            value={paymentUrl}
          />
        </UnmountClosed>
      </div>
    </Card>
  );
};

export default CreatePaymentLinkPage;
