import * as anchor from "@project-serum/anchor";

// export const merchantTests = describe("[Merchant] Test Cases", () => {});
//
// it("initialize product", async () => {
//   let name = "Gold Special";
//   let description =
//     "bus\\nCharlotte Patton Incidunt hic aspern 4421, Aschach an der Steyr\\nArsenio Richard Ex et est ut et corr 21410, Dol";
//   let unit_label = "";
//   let defaultPrice: anchor.web3.PublicKey;
//   let sku = "";
//   let images: string[] = [
//     "https://static.zajo.net/content/mediagallery/zajo_dcat/image/product/types/X/9088.png",
//   ];
//   [productAccount, productBump] = await PublicKey.findProgramAddress(
//     [
//       Buffer.from("product"),
//       Buffer.from(name),
//       merchantWallet.publicKey.toBuffer(),
//     ],
//     program.programId
//   );
//   await program.methods
//     .initializeProduct(
//       name,
//       merchantWallet.publicKey,
//       description,
//       sku,
//       defaultPrice,
//       unit_label,
//       images
//     )
//     .accounts({
//       productAccount: productAccount,
//       merchant: merchantWallet.publicKey,
//       systemProgram: SystemProgram.programId,
//       clock: SYSVAR_CLOCK_PUBKEY,
//     })
//     .signers([merchantWallet.payer])
//     .rpc();
//
//   const dataProductAccount = await program.account.product.fetch(
//     productAccount
//   );
//   console.log(dataProductAccount);
//   //   throw new Error('Should not be error')
//   // } catch (e) {
//   //   console.log('After merchantWallet SOL amount:', e);
//   // }
// });
