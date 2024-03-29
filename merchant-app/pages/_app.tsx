import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import Head from "next/head";
import AppLayout from "../src/layout/AppLayout";
import { useMemo, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  CoinbaseWalletAdapter,
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { ProgramProvider } from "../src/provider/ProgramProvider";
import { localhostEndpoint } from "../config/globalVariables";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  },
});

function MyApp(props: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const { Component, pageProps } = props;
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => {
    if (process.env.NODE_ENV === "development") {
      return localhostEndpoint;
    }
    return clusterApiUrl(network);
  }, [network]);
  const wallets = useMemo(
    () => [
      // new SolanaMobileWalletAdapter({
      //   appIdentity: { name: "Maius Pay" },
      //   authorizationResultCache: createDefaultAuthorizationResultCache(),
      // }),
      new CoinbaseWalletAdapter(),
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );
  return (
    <>
      <Head>
        <title>Maius Pay</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ConnectionProvider
          endpoint={endpoint}
          config={{ commitment: "confirmed" }}
        >
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
              >
                <MantineProvider
                  theme={{ colorScheme }}
                  withGlobalStyles
                  withNormalizeCSS
                >
                  <NotificationsProvider position="top-right">
                    <ProgramProvider>
                      <AppLayout>
                        <Component {...pageProps} />
                      </AppLayout>
                    </ProgramProvider>
                  </NotificationsProvider>
                </MantineProvider>
              </ColorSchemeProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </QueryClientProvider>

      <style jsx>
        {`
          .ReactCollapse--collapse {
            width: 100%;
          }
        `}
      </style>
    </>
  );
}

export default MyApp;
