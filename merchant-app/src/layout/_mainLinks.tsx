import React from "react";
import { Box, CurrencyDollar, Settings } from "tabler-icons-react";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import Link from "next/link";
import { useProgram } from "../provider/ProgramProvider";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  link: string;
}

function MainLink({ icon, color, label, link }: MainLinkProps) {
  return (
    <Link href={link}>
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
  const { routes } = useProgram();
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
      icon: <Box size={16} />,
      link: routes.merchant.products.list,
      color: "blue",
      label: "Products",
    },
    {
      icon: <CurrencyDollar size={16} />,
      link: routes.merchant.pricing.list,
      color: "blue",
      label: "Pricing",
    },
  ];
  return (
    <div>
      <Text p="xs" transform="uppercase" color="gray" size="xs">
        Config
      </Text>
      {configLinks.map((link) => (
        <MainLink {...link} key={link.label} />
      ))}
      <Text p="xs" transform="uppercase" color="gray" size="xs">
        Product
      </Text>
      {productLinks.map((link) => (
        <MainLink {...link} key={link.label} />
      ))}
    </div>
  );
};
