import {
  ActionIcon,
  AppShell,
  Group,
  Header,
  Navbar,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { MoonStars, Sun } from "tabler-icons-react";
import { MainLinks } from "./_mainLinks";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import React from "react";
import { useRouter } from "next/router";
import { useProgram } from "../provider/ProgramProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import ClientLayout from "./ClientLayout";

const AppLayout = ({ children }) => {
  const router = useRouter();
  const wallet = useWallet();
  const { routes } = useProgram();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  if (router.pathname?.includes("/payment/")) {
    return <ClientLayout>{children}</ClientLayout>;
  }

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <Navbar.Section grow mt="xs">
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <div className="d-flex flex-column mb-2 w-100 overflow-scroll">
              {!wallet?.connected && <WalletMultiButton />}
              <div style={{ height: "12px" }} />
              <WalletDisconnectButton />
            </div>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60}>
          <Group
            sx={{ height: "100%" }}
            px={20}
            position="apart"
            style={{ cursor: "pointer" }}
          >
            <Text
              onClick={() => {
                router.push(routes.merchant.home);
              }}
            >
              Maius Pay
            </Text>
            <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              size={30}
            >
              {colorScheme === "dark" ? (
                <Sun size={16} />
              ) : (
                <MoonStars size={16} />
              )}
            </ActionIcon>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <div style={{ minHeight: "100vh" }}>{children}</div>
    </AppShell>
  );
};

export default AppLayout;
