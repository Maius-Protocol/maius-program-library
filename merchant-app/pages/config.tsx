import React from "react";
import { useMerchantAccount } from "../src/services/merchant/useMerchantAccount";
import SetupMerchant from "../src/pages/config/SetupMerchant";
import UpdateMerchantInfo from "../src/pages/config/UpdateMerchantInfo";
import { Text } from "@mantine/core";
const ConfigPage = () => {
  const { data: merchantAccount } = useMerchantAccount();
  return (
    <div>
      <Text size="xl" weight={700} className="mb-2">
        Config
      </Text>
      {!merchantAccount && <SetupMerchant />}
      {merchantAccount && <UpdateMerchantInfo />}
    </div>
  );
};

export default ConfigPage;
