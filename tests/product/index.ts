import * as anchor from "@project-serum/anchor";
import {
  airdropAccounts,
  createNewKeys,
  program,
} from "../shared";
import { globalState } from "../maius-program-library";
import { SystemProgram, PublicKey, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import {findCustomerAddress, findMerchantAddress} from "../merchant/address";
// import * as Buffer from "buffer";


let productAccount: anchor.web3.PublicKey,
    productAccount1: anchor.web3.PublicKey,
    merchantAccount: anchor.web3.PublicKey;
let productBump: number,
    productBump1: number,
    merchantBump: number;


export const productTests = describe("[Product] Test Cases", () => {
  before(async () => {
    await createNewKeys();
    await airdropAccounts();
  });

  it("[Merchant] Create", async () => {
    [merchantAccount, merchantBump] = await PublicKey.findProgramAddress(
        [
          Buffer.from("v1"),
          Buffer.from("merchant"),
          globalState.merchantWallet.publicKey.toBuffer(),
        ],
        program.programId
    );
    const genesisCustomer = await findCustomerAddress(globalState.merchantWallet);
    await program.methods
        .initializeMerchant(
            "MaiusPay",
            "Awesome store",
            "https://i.pravatar.cc/300"
        )
        .accounts({
          merchant: merchantAccount,
          genesisCustomer: genesisCustomer,
          merchantWallet: globalState.merchantWallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([globalState.merchantWallet.payer])
        .rpc();

    const data = await program.account.merchant.fetch(merchantAccount);
    console.log("[Merchant] Create result: ", data);
  });

  it("initialize product", async () => {
    const merchantData = await program.account.merchant.fetch(merchantAccount);  
    let name = "Gold Special";
    let description =
        "bus\\nCharlotte Patton Incidunt hic aspern 4421, Aschach an der Steyr\\nArsenio Richard Ex et est ut et corr 21410, Dol";
    let unit_label = "";
    let defaultPrice: anchor.web3.PublicKey;
    let sku = "sku_abeoisjfkeri";
    let images: string[] = [
      "https://static.zajo.net/content/mediagallery/zajo_dcat/image/product/types/X/9088.png",
    ];
    [productAccount, productBump] = await PublicKey.findProgramAddress(
        [
            Buffer.from("v1"),
            Buffer.from("product"),
            merchantAccount.toBuffer(),
            Buffer.from(merchantData.productCount.toString())
            
        ],
        program.programId
    );
    await program.methods
        .initializeProduct(
            sku,
            name,
            globalState.merchantWallet.publicKey,
            description,
            defaultPrice,
            unit_label,
            images
        )
        .accounts({
          merchantAccount: merchantAccount,
          productAccount: productAccount,
          merchant: globalState.merchantWallet.publicKey,
          systemProgram: SystemProgram.programId,
          clock: SYSVAR_CLOCK_PUBKEY,
        })
        .signers([globalState.merchantWallet.payer])
        .rpc();

    const dataProductAccount = await program.account.product.fetch(
        productAccount
    );
    console.log(dataProductAccount);
    const merchantData1 = await program.account.merchant.fetch(merchantAccount);
    console.log(merchantData1)

      let name1 = "Gold Special1";
      let description1 =
          "bus\\nCharlotte Patton Incidunt hic aspern 4421, Aschach an der Steyr\\nArsenio Richard Ex et est ut et corr 21410, Dol";
      let unit_label1 = "";
      let defaultPrice1: anchor.web3.PublicKey;
      let sku1 = "sku_abeoiskeleri";
      let images1: string[] = [
          "https://static.zajo.net/content/mediagallery/zajo_dcat/image/product/types/X/9088.png",
      ];
      [productAccount1, productBump1] = await PublicKey.findProgramAddress(
          [
              Buffer.from("v1"),
              Buffer.from("product"),
              merchantAccount.toBuffer(),
              Buffer.from(merchantData1.productCount.toString())

          ],
          program.programId
      );
      await program.methods
          .initializeProduct(
              sku1,
              name1,
              globalState.merchantWallet.publicKey,
              description1,
              defaultPrice1,
              unit_label1,
              images1
          )
          .accounts({
              merchantAccount: merchantAccount,
              productAccount: productAccount1,
              merchant: globalState.merchantWallet.publicKey,
              systemProgram: SystemProgram.programId,
              clock: SYSVAR_CLOCK_PUBKEY,
          })
          .signers([globalState.merchantWallet.payer])
          .rpc();

      const dataProductAccount1 = await program.account.product.fetch(
          productAccount1
      );
      console.log(dataProductAccount1);
      const merchantData2 = await program.account.merchant.fetch(merchantAccount);
      console.log(merchantData2)

      //   throw new Error('Should not be error')
    // } catch (e) {
    //   console.log('After merchantWallet SOL amount:', e);
    // }
  });

});

