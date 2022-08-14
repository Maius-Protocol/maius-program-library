import { useRouter } from "next/router";
import {
  Avatar,
  Grid,
  Group,
  NumberInput,
  Skeleton,
  Title,
  Button,
  Divider,
  Image,
} from "@mantine/core";
import { Base64 } from "js-base64";
import { useMerchantAccount } from "../../../src/services/merchant/useMerchantAccount";
import { useProductAccount } from "../../../src/services/product/useProductAccount";
import { usePriceAccount } from "../../../src/services/pricing/usePriceAccount";
import React, { useEffect, useState } from "react";
import { TokenListProvider } from "@solana/spl-token-registry";
import { supportedTokens } from "../../../config/globalVariables";
import CheckoutButton from "../../../src/pages/client/CheckoutButton";
import {
  WalletConnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { useProgram } from "../../../src/provider/ProgramProvider";
import { UnmountClosed } from "react-collapse";
import WrappedSolanaPay from "./solana-pay";

const PaymentFromLink = () => {
  const [paymentMethod, setPaymentMethod] = useState("default");
  const { connected } = useWallet();
  const [tokenList, setTokenList] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { params } = router.query;
  const parsedParams = JSON.parse(params ? Base64.decode(params) : "{}");
  const merchant_wallet = parsedParams?.merchant_wallet;
  const product_count_index = parsedParams?.product_count_index;
  const price_count_index = parsedParams?.price_count_index;

  const { data: merchantAccount, isLoading: isLoadingMerchant } =
    useMerchantAccount(merchant_wallet);

  const { data: productAccount, isLoading: isLoadingProduct } =
    useProductAccount(merchant_wallet, parseInt(product_count_index));
  const { data: priceAccount, isLoading: isLoadingPrice } = usePriceAccount(
    merchant_wallet,
    product_count_index,
    price_count_index
  );

  const isLoading = isLoadingMerchant || isLoadingProduct || isLoadingPrice;

  useEffect(() => {
    new TokenListProvider().resolve().then((tokens) => {
      const _tokenList = tokens.getList();
      setTokenList(_tokenList);
    });
  }, []);

  const tokens = priceAccount?.acceptedTokens?.map((t) =>
    tokenList?.find((e) => e.address === t?.toBase58())
  );

  return (
    <div>
      <Grid>
        <Grid.Col span={6}>
          <div
            className="p-lg-5 d-flex flex-column align-content-center justify-content-center"
            style={{ height: "100vh", marginLeft: "25%" }}
          >
            <div>
              {isLoading && (
                <>
                  <Skeleton height={100} width={100} mb="xl" />
                  <Skeleton height={40} mb="sm" />
                  <Skeleton height={40} mb="sm" />
                  <Skeleton height={40} mb="sm" />
                </>
              )}
              {!isLoading && (
                <>
                  <h5>{productAccount.name}</h5>
                  <h2>{`$${
                    priceAccount?.unitAmount?.toNumber() * quantity
                  }`}</h2>
                  <NumberInput
                    onChange={setQuantity}
                    value={quantity}
                    style={{ maxWidth: "120px" }}
                    label="Quantity"
                  />
                  <Avatar
                    radius="md"
                    src={merchantAccount?.logoUrl}
                    size={300}
                    className="mt-4"
                  />
                </>
              )}
            </div>
            <div className="text-muted" style={{ marginTop: "200px" }}>
              Powered by MaiusPay
            </div>
          </div>
        </Grid.Col>
        <Grid.Col
          span={6}
          style={{
            height: "100vh",
            // border: "1px solid red",
            boxShadow: "15px 0 30px 0 rgba(0,0,0,.18)",
          }}
          className="p-4 d-flex flex-column align-items-center justify-content-center"
        >
          <UnmountClosed isOpened={paymentMethod === "default"}>
            <div className="w-100">
              {!connected && (
                <div className="my-3">
                  <WalletMultiButton />
                </div>
              )}
              {/*<div className="text-muted mb-4">Accepting payments with</div>*/}
              {isLoading && (
                <>
                  <Skeleton height={40} mb="sm" />
                  <Skeleton height={40} mb="sm" />
                  <Skeleton height={40} mb="sm" />
                </>
              )}
              <Button
                className="mt-3"
                color="dark"
                size="lg"
                sx={{ width: "100%" }}
                style={{ minWidth: "450px" }}
                onClick={() => {
                  setPaymentMethod("solana-pay");
                  // setTimeout(() => {
                  //   router.push("/thanks");
                  // }, 1000 * 10);
                }}
              >
                <div className="d-flex flex-row align-items-center">
                  Checkout with{" "}
                  <Image ml={12} width={64} src="/solana_pay.png" />
                </div>
              </Button>
              <Divider
                my={10}
                label={
                  <span className="text-muted" style={{ fontSize: "16px" }}>
                    or
                  </span>
                }
                labelPosition="center"
              />
              {!isLoading && (
                <>
                  {tokens?.map((t) => {
                    return (
                      <div
                        key={`row_${t?.address}`}
                        className="d-flex flex-row align-items-center mb-3"
                      >
                        <div className="p-2">
                          <Avatar radius="md" src={t?.logoURI} size={40} />
                        </div>
                        <CheckoutButton
                          merchant_wallet={merchant_wallet}
                          price_count_index={price_count_index}
                          product_count_index={product_count_index}
                          symbol={t?.symbol}
                          quantity={quantity}
                        />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </UnmountClosed>
          <UnmountClosed isOpened={paymentMethod === "solana-pay"}>
            <WrappedSolanaPay tokens={tokens} />
          </UnmountClosed>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default PaymentFromLink;
