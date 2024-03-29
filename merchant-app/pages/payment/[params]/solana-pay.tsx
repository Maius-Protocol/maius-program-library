import { QRCode } from "../../../src/pages/client/QRCode";
import { PaymentProvider } from "../../../src/provider/PaymentProvider";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useMemo, useState } from "react";
import { ConfigProvider } from "../../../src/provider/ConfigProvider";
import { useRouter } from "next/router";
import { TransactionsProvider } from "../../../src/provider/TransactionsProvider";
import { Base64 } from "js-base64";
import { Avatar, Group, Loader, Progress, Title } from "@mantine/core";
import { MAX_CONFIRMATIONS } from "../../../src/utils/constants";
import { PaymentStatus, usePayment } from "../../../src/hooks/usePayment";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const SolanaPayPage = ({ token }) => {
  const { status } = usePayment();
  return (
    <div className="d-flex flex-column align-items-center">
      <QRCode />
      {status === PaymentStatus.Pending && (
        <div style={{ marginBottom: "24px" }}>
          <Loader />{" "}
          <span style={{ marginLeft: "8px" }}>Waiting scan QR...</span>
        </div>
      )}
      {status === PaymentStatus.Confirmed && (
        <div style={{ marginBottom: "24px" }}>
          <Loader />{" "}
          <span style={{ marginLeft: "8px" }}>Confirming transaction...</span>
        </div>
      )}
    </div>
  );
};

const WrappedSolanaPay = ({ tokens }) => {
  const [selectedToken, setSelectedToken] = useState();
  const router = useRouter();
  const { params } = router.query;
  const parsedParams = JSON.parse(params ? Base64.decode(params) : "{}");
  const merchant_wallet = parsedParams?.merchant_wallet;
  const product_count_index = parsedParams?.product_count_index;
  const price_count_index = parsedParams?.price_count_index;
  // const baseURL = `https://172.16.3.36:3001`;
  // const baseURL = `https://maius-program-library.vercel.app`;
  const baseURL = "https://maius-program-library.vercel.app";

  const { connected } = useWallet();
  const link = useMemo(() => new URL(`${baseURL}/api/`), [baseURL]);

  let recipient = undefined;
  try {
    recipient = new PublicKey(merchant_wallet);
  } catch (e) {}

  useEffect(() => {
    setSelectedToken(tokens?.[0]);
  }, [tokens]);

  if (!recipient || !selectedToken?.address) {
    return <Progress />;
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <WalletMultiButton />
      <ConfigProvider
        baseURL={baseURL}
        link={link}
        recipient={recipient}
        label={""}
        message={""}
        symbol={"SOL"}
        icon={<></>}
        decimals={9}
        minDecimals={1}
        connectWallet={connected}
        // splToken={new PublicKey(selectedToken?.address)}
        splToken={new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr")}
        requiredConfirmations={MAX_CONFIRMATIONS}
      >
        <TransactionsProvider>
          <PaymentProvider>
            <SolanaPayPage token={selectedToken} />
          </PaymentProvider>
        </TransactionsProvider>
      </ConfigProvider>

      <Group>
        {tokens?.map((t) => {
          return (
            <div
              key={`row_${t?.address}`}
              className="d-flex flex-row align-items-center mb-3"
              style={{
                ...(t.address !== selectedToken?.address
                  ? { opacity: 0.3 }
                  : {}),
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedToken(t);
              }}
            >
              <div className="p-2">
                <Avatar radius="md" src={t?.logoURI} size={40} />
              </div>
              <Title style={{ fontSize: 14 }}>{t?.name}</Title>
            </div>
          );
        })}
      </Group>
    </div>
  );
};

export default WrappedSolanaPay;
