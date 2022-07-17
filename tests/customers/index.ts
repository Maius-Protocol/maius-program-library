// import {
//   airdropAccounts,
//   createNewKeys,
//   initializeMerchant,
//   program,
// } from "../shared";
// import { findCustomerAddress, findMerchantAddress } from "../merchant/address";
// import { globalState } from "../maius-program-library";
//
// const anchor = require("@project-serum/anchor");
// const { SystemProgram } = anchor.web3;
//
// export const customerTests = describe("[Customer] Test Cases", () => {
//   before(async () => {
//     await createNewKeys();
//     await airdropAccounts();
//     await initializeMerchant(globalState.merchantWallet);
//   });
//
//   it("Create a customer of merchant", async () => {
//     const description = "Create a customer of merchant";
//     const customerWallet = globalState.customerWallet;
//     const merchantWallet = globalState.merchantWallet;
//     const customerAccount = await findCustomerAddress(customerWallet);
//     const merchantAccount = await findMerchantAddress(merchantWallet);
//     await program.methods
//       .initializeCustomer(description, customerWallet.publicKey)
//       .accounts({
//         merchantAccount: merchantAccount,
//         customerAccount: customerAccount,
//         merchantAuthority: merchantWallet.publicKey,
//         systemProgram: SystemProgram.programId,
//       })
//       .signers([merchantWallet.payer])
//       .rpc();
//
//     const dataCustomerAccount = await program.account.customer.fetch(
//       customerAccount
//     );
//     const merchantdata = await program.account.merchant.fetch(merchantAccount);
//     console.log("Create", dataCustomerAccount);
//     console.log("Check merchant", merchantdata);
//   });
//
//   it("Update customer description", async () => {
//     // await program.methods
//     //   .updateCustomer("Updated description")
//     //   .accounts({
//     //     customerAccount: customerAccount,
//     //     merchantAuthority: merchantWallet.publicKey,
//     //     systemProgram: SystemProgram.programId,
//     //   })
//     //   .signers([merchantWallet.payer])
//     //   .rpc();
//     //
//     // const dataCustomerAccount = await program.account.customer.fetch(
//     //   customerAccount
//     // );
//     // console.log("After Update: ", dataCustomerAccount.description);
//   });
//
//   it("Delete customer", async () => {
//     // console.log(
//     //   "Before merchantWallet SOL amount: ",
//     //   await getBalance(merchantWallet.publicKey.toBase58())
//     // );
//     // await program.methods
//     //   .deleteCustomer()
//     //   .accounts({
//     //     customerAccount: customerAccount,
//     //     merchantAuthority: merchantWallet.publicKey,
//     //     systemProgram: SystemProgram.programId,
//     //   })
//     //   .signers([merchantWallet.payer])
//     //   .rpc();
//     // try {
//     //   const dataCustomerAccount = await program.account.customer.fetch(
//     //     customerAccount
//     //   );
//     //   throw new Error("Should not be deleteable");
//     // } catch (e) {
//     //   console.log(
//     //     "After merchantWallet SOL amount:",
//     //     await getBalance(merchantWallet.publicKey.toBase58())
//     //   );
//     // }
//   });
// });
