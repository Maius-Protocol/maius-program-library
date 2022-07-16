import { airdropAccounts, createNewKeys, initializeMerchant } from "../shared";
import { globalState } from "../maius-program-library";

export const merchantTests = describe("[Merchant] Test Cases", () => {
  before(async () => {
    await createNewKeys();
    await airdropAccounts();
    await initializeMerchant(globalState.merchantWallet);
  });
  it("[Merchant] Create", async () => {});

  it("[Merchant] Add new customers", async () => {});

  it("[Merchant] Update", async () => {});

  it("[Merchant Customers] Update", async () => {});

  it("[Merchant Customers] Delete", async () => {});

  it("[Merchant] Delete", async () => {});
});
