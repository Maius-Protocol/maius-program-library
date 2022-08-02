import { Avatar, Group, MultiSelect, Text } from "@mantine/core";
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

const TokenField = ({ values, setValues }: UseFormReturnType<any>) => {
  const [value, setValue] = useState([]);
  const [tokenList, setTokenList] = useState<any[]>([]);

  useEffect(() => {
    new TokenListProvider().resolve().then((tokens) => {
      const _tokenList = tokens.getList();
      setTokenList(_tokenList);
    });
  }, []);

  useEffect(() => {
    setValues({
      ...values,
      accepted_tokens: value,
    });
  }, [value]);

  const tokens = tokenList
    ?.filter((e) => supportedTokens?.includes(e?.symbol))
    ?.map((e) => ({
      image: e?.logoURI,
      label: e?.symbol,
      value: e?.address,
      description: e?.name,
    }));

  return (
    <MultiSelect
      key={JSON.stringify(values.accepted_tokens)}
      label="Accept Tokens (Exchange rate source from pyth.network)"
      placeholder="Pick multiple"
      data={tokens}
      itemComponent={SelectItem}
      maxDropdownHeight={250}
      searchable
      sx={{ flex: 1 }}
      value={values.accepted_tokens}
      onChange={setValue}
      className="mb-2"
    />
  );
};

export default TokenField;
