import {
  ActionIcon,
  Avatar,
  Group,
  MultiSelect,
  Select,
  Text,
} from "@mantine/core";
import { Trash } from "tabler-icons-react";
import React, { forwardRef, useEffect, useState } from "react";
import { TokenListProvider } from "@solana/spl-token-registry";
import { UseFormReturnType } from "@mantine/form/lib/types";
import { supportedTokens } from "../../../config/globalVariables";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

const TokenField = ({ getInputProps, setValues }: UseFormReturnType<any>) => {
  const [tokenList, setTokenList] = useState<any[]>([]);

  useEffect(() => {
    new TokenListProvider().resolve().then((tokens) => {
      const _tokenList = tokens.getList();
      setTokenList(_tokenList);
    });
  }, []);

  return (
    <MultiSelect
      label="Accept Tokens (Exchange rate source from pyth.network)"
      placeholder="Pick multiple"
      data={tokenList
        ?.filter((e) => supportedTokens?.includes(e?.symbol))
        ?.map((e) => ({
          image: e?.logoURI,
          label: e?.symbol,
          value: e?.address,
          description: e?.name,
        }))}
      itemComponent={SelectItem}
      maxDropdownHeight={250}
      searchable
      sx={{ flex: 1 }}
      onChange={(value) => {
        setValues({
          accepted_tokens: value,
        });
      }}
      className="mb-2"
    />
  );
};

export default TokenField;
