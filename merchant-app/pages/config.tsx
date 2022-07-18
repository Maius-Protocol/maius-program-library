import {
  Button,
  Card,
  Center,
  Group,
  Image,
  Loader,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import React from "react";
import { useMerchantAccount } from "../src/services/merchant/useMerchantAccount";
import { useCreateMerchantAccount } from "../src/services/merchant/useCreateMerchantAccount";
import { showNotification } from "@mantine/notifications";

const ConfigPage = () => {
  const theme = useMantineTheme();
  const { data: merchantAccount, isLoading } = useMerchantAccount();
  const { mutateAsync: createAccount, isLoading: isCreating } =
    useCreateMerchantAccount();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const create = async () => {
    try {
      await createAccount();
    } catch (e) {
      showNotification({
        title: "Something went wrong!",
        message: `${e.toString()}`,
        color: "red",
      });
    }
  };
  return (
    <div>
      <div className="d-flex flex-row mb-2">
        <WalletMultiButton />
        <WalletDisconnectButton />
      </div>
      {isLoading && (
        <Center>
          <Loader />
        </Center>
      )}
      {!merchantAccount && (
        <Center className="p-5">
          <Card shadow="sm" p="lg" style={{ maxWidth: "400px" }}>
            <Card.Section>
              <Image
                src="https://source.unsplash.com/mMXgAajaTNw"
                height={320}
                alt="Norway"
              />
            </Card.Section>

            <Group
              position="apart"
              style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
            >
              <Text weight={500}>Welcome to Maius Pay!</Text>
            </Group>

            <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
              With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway
            </Text>

            <Button
              loading={isCreating}
              onClick={create}
              variant="light"
              color="blue"
              fullWidth
              style={{ marginTop: 14 }}
            >
              Create an account now!
            </Button>
          </Card>
        </Center>
      )}
    </div>
  );
};

export default ConfigPage;
