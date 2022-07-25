import React from "react";
import { Text } from "@mantine/core";
import SetupMerchant from "../../../src/pages/config/SetupMerchant";
import UpdateMerchantInfo from "../../../src/pages/config/UpdateMerchantInfo";
import { useMerchantAccount } from "../../../src/services/merchant/useMerchantAccount";
import { useRouter } from "next/router";
const ConfigPage = () => {
  const router = useRouter();
  const { merchantWalletAddress } = router.query;
  const { data: merchantAccount } = useMerchantAccount(
    merchantWalletAddress as string
  );
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
