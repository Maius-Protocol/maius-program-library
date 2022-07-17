import {
  airdropAccounts,
  createNewKeys,
  initializeMerchant,
  program,
} from "../shared";
import { globalState } from "../maius-program-library";
import { findCustomerAddress, findMerchantAddress } from "./address";
import { SystemProgram } from "@solana/web3.js";

export const merchantTests = describe("[Merchant] Test Cases", () => {
  before(async () => {
    await createNewKeys();
    await airdropAccounts();
    await initializeMerchant(globalState.merchantWallet);
  });
  it("[Merchant] Create", async () => {});

  it("[Merchant] Update", async () => {
    const merchantWallet = globalState.merchantWallet;
    const merchantAccount = await findMerchantAddress(merchantWallet);
    await program.methods
      .updateMerchant("Maius Pay 1", "Updated", "https://google.com")
      .accounts({
        merchantAccount: merchantAccount,
        merchantAuthority: merchantWallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([merchantWallet.payer])
      .rpc();

    const data = await program.account.merchant.fetch(merchantAccount);
    console.log("After Update: ", data);
  });

  it("[Merchant] Delete", async () => {});
});
