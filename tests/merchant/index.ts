// import {
//   airdropAccounts,
//   createNewKeys,
//   program,
// } from "../shared";
// import { globalState } from "../maius-program-library";
// import { findCustomerAddress, findMerchantAddress } from "./address";
// import { SystemProgram } from "@solana/web3.js";
// import {Wallet} from "@project-serum/anchor";
//
// export const merchantTests = describe("[Merchant] Test Cases", () => {
//   before(async () => {
//     await createNewKeys();
//     await airdropAccounts();
//   });
//
//   it("[Merchant] Create", async () => {
//       const address = await findMerchantAddress(globalState.merchantWallet);
//       const genesisCustomer = await findCustomerAddress(globalState.merchantWallet);
//       await program.methods
//           .initializeMerchant(
//               "MaiusPay",
//               "Awesome store",
//               "https://i.pravatar.cc/300"
//           )
//           .accounts({
//               merchant: address,
//               genesisCustomer: genesisCustomer,
//               merchantWallet: globalState.merchantWallet.publicKey,
//               systemProgram: SystemProgram.programId,
//           })
//           .signers([globalState.merchantWallet.payer])
//           .rpc();
//
//       const data = await program.account.merchant.fetch(address);
//       console.log("[Merchant] Create result: ", data);
//   });
//
//   it("[Merchant] Update", async () => {
//     const merchantWallet = globalState.merchantWallet;
//     const merchantAccount = await findMerchantAddress(merchantWallet);
//     await program.methods
//       .updateMerchant("Maius Pay 1", "Updated", "https://google.com")
//       .accounts({
//         merchantAccount: merchantAccount,
//         merchantAuthority: merchantWallet.publicKey,
//         systemProgram: SystemProgram.programId,
//       })
//       .signers([merchantWallet.payer])
//       .rpc();
//
//     const data = await program.account.merchant.fetch(merchantAccount);
//     console.log("After Update: ", data);
//   });
//
//   it("[Merchant] Delete", async () => {});
// });
