import React from "react";
import {
  GitPullRequest,
  AlertCircle,
  Messages,
  Database,
  Settings,
} from "tabler-icons-react";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import Link from "next/link";

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

const configLinks = [
  {
    icon: <Settings size={16} />,
    color: "blue",
    label: "Configuartion",
    link: "/config",
  },
];
const productLinks = [
  {
    icon: <GitPullRequest size={16} />,
    link: "/products",
    color: "blue",
    label: "Products",
  },
  {
    icon: <GitPullRequest size={16} />,
    link: "/pricing",
    color: "blue",
    label: "Pricing",
  },
];

export function MainLinks() {
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
}
