import React from "react";
import {
  Box,
  CurrencyDollar,
  Globe,
  Note,
  Settings,
  User,
} from "tabler-icons-react";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import Link from "next/link";
import { useProgram } from "../provider/ProgramProvider";
import classNames from "classnames";
import { useMerchantAccount } from "../services/merchant/useMerchantAccount";
import { useWallet } from "@solana/wallet-adapter-react";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  link: string;
  disabled?: boolean;
}

function MainLink({
  icon,
  color,
  label,
  link,
  disabled = false,
}: MainLinkProps) {
  return (
    <Link href={disabled ? "#" : link}>
      <UnstyledButton
        sx={(theme) => ({
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
}

export const MainLinks = () => {
  const { connected } = useWallet();

  const { routes, merchantWalletAddress } = useProgram();
  const { data: merchantAccount } = useMerchantAccount(merchantWalletAddress);
  const configLinks = [
    {
      icon: <Settings size={16} />,
      color: "blue",
      label: "Configuartion",
      link: routes.merchant.config,
    },
  ];

  const productLinks = [
    {
      icon: <User size={16} />,
      link: routes.merchant.customers.list,
      color: "blue",
      label: "Customers",
    },
    {
      icon: <Box size={16} />,
      link: routes.merchant.products.list,
      color: "blue",
      label: "Products",
    },
    {
      icon: <Note size={16} />,
      link: routes.merchant.invoices.list,
      color: "blue",
      label: "Invoices",
    },
  ];

  const directPaymentLinks = [
    {
      icon: <Globe size={16} />,
      link: routes.merchant.payment_links.list,
      color: "blue",
      label: "Payment Links",
    },
  ];

  const disabled = !merchantAccount;

  if (!connected) {
    return <></>;
  }

  return (
    <div>
      <Text p="xs" transform="uppercase" color="gray" size="xs">
        Config
      </Text>
      {configLinks.map((link) => (
        <MainLink {...link} key={link.label} />
      ))}
      <div
        className={classNames({
          "opacity-50 user-select-none": disabled,
        })}
      >
        <Text p="xs" transform="uppercase" color="gray" size="xs">
          Merchant
        </Text>
        {productLinks.map((link) => (
          <MainLink {...link} key={link.label} disabled={disabled} />
        ))}
      </div>
      <div
        className={classNames({
          "opacity-50 user-select-none": disabled,
        })}
      >
        <Text p="xs" transform="uppercase" color="gray" size="xs">
          Direct Payments
        </Text>
        {directPaymentLinks.map((link) => (
          <MainLink {...link} key={link.label} disabled={disabled} />
        ))}
      </div>
    </div>
  );
};
