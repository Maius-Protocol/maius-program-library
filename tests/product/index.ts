import * as anchor from "@project-serum/anchor";
import {
  airdropAccounts,
  createNewKeys,
  program,
} from "../shared";
import { globalState } from "../maius-program-library";
import { SystemProgram, PublicKey, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";


export const productTests = describe("[Product] Test Cases", () => {
  before(async () => {
    await createNewKeys();
    await airdropAccounts();
  });

  it("initialize product", async () => {
    let name = "Gold Special";
    let description =
        "bus\\nCharlotte Patton Incidunt hic aspern 4421, Aschach an der Steyr\\nArsenio Richard Ex et est ut et corr 21410, Dol";
    let unit_label = "";
    let defaultPrice: anchor.web3.PublicKey;
    let sku = "";
    let images: string[] = [
      "https://static.zajo.net/content/mediagallery/zajo_dcat/image/product/types/X/9088.png",
    ];
    [globalState.productAccount, globalState.productBump] = await PublicKey.findProgramAddress(
        [
          Buffer.from("product"),
          Buffer.from(name),
          globalState.merchantWallet.publicKey.toBuffer(),
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
          productAccount: globalState.productAccount,
          merchant: globalState.merchantWallet.publicKey,
          systemProgram: SystemProgram.programId,
          clock: SYSVAR_CLOCK_PUBKEY,
        })
        .signers([globalState.merchantWallet.payer])
        .rpc();

    const dataProductAccount = await program.account.product.fetch(
        globalState.productAccount
    );
    console.log(dataProductAccount);
    //   throw new Error('Should not be error')
    // } catch (e) {
    //   console.log('After merchantWallet SOL amount:', e);
    // }
  });

});

