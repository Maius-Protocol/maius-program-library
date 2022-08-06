import * as anchor from "@project-serum/anchor";
import {
    airdropAccounts,
    createNewKeys,
    program,
} from "../shared";
import { globalState } from "../maius-program-library";
import { SystemProgram, PublicKey } from "@solana/web3.js";
import {findCustomerAddress} from "../merchant/address";
// import * as Buffer from "buffer";


let subscriptionAccount: anchor.web3.PublicKey,
    subscriptionAccount1: anchor.web3.PublicKey,
    merchantAccount: anchor.web3.PublicKey,
    customerAccount: anchor.web3.PublicKey;
let subscriptionBump: number,
    subscriptionBump1: number,
    merchantBump: number;


export const subscriptionTests = describe("[Subscription] Test Cases", () => {
    before(async () => {
        await createNewKeys();
        await airdropAccounts();
    });

    console.log("globalState.merchantWallet.payer", globalState.merchantWallet.publicKey.toBase58())

    it("[Merchant] Create", async () => {
        [merchantAccount, merchantBump] = await PublicKey.findProgramAddress(
            [
                Buffer.from("v1"),
                Buffer.from("merchant"),
                globalState.merchantWallet.publicKey.toBuffer(),
            ],
            program.programId
        );
        customerAccount = await findCustomerAddress(globalState.merchantWallet);
        await program.methods
            .initializeMerchant()
            .accounts({
                merchant: merchantAccount,
                genesisCustomer: customerAccount,
                merchantWallet: globalState.merchantWallet.payer.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .signers([globalState.merchantWallet.payer])
            .rpc();

        await program.methods
            .updateMerchant(
                "MaiusPay",
                "Awesome store",
                "https://i.pravatar.cc/300",
            )
            .accounts({
                merchantAccount: merchantAccount,
                systemProgram: SystemProgram.programId,
                payer: globalState.merchantWallet.publicKey,
            })
            .signers([globalState.merchantWallet.payer])
            .rpc();

        const data = await program.account.merchant.fetch(merchantAccount);
        console.log("[Merchant] Create result: ", data);
    });

    // it("initialize subscription", async () => {
    //     const merchantData = await program.account.merchant.fetch(merchantAccount);
    //     let lastInvoice: anchor.web3.PublicKey;
    //     [subscriptionAccount, subscriptionBump] = await PublicKey.findProgramAddress(
    //         [
    //             Buffer.from("v1"),
    //             Buffer.from("subscription"),
    //             merchantAccount.toBuffer(),
    //             Buffer.from(merchantData.subscriptionCount.toString())
    //
    //         ],
    //         program.programId
    //     );
    //     let current_period_end = Date.now() + 24 * 60 * 60 * 1000
    //     console.log('current_period_end 1', current_period_end)
    //
    //     await program.methods
    //         .initializeSubscription(
    //             merchantAccount,
    //             customerAccount,
    //             lastInvoice,
    //             new anchor.BN(current_period_end),
    //         )
    //         .accounts({
    //             merchantAccount: merchantAccount,
    //             subscriptionAccount: subscriptionAccount,
    //             merchant: globalState.merchantWallet.publicKey,
    //             systemProgram: SystemProgram.programId,
    //         })
    //         .signers([globalState.merchantWallet.payer])
    //         .rpc();
    //
    //     const dataSubscriptionAccount = await program.account.subscription.fetch(
    //         subscriptionAccount
    //     );
    //     console.log(dataSubscriptionAccount);
    //     const merchantData1 = await program.account.merchant.fetch(merchantAccount);
    //
    //     [subscriptionAccount1, subscriptionBump1] = await PublicKey.findProgramAddress(
    //         [
    //             Buffer.from("v1"),
    //             Buffer.from("subscription"),
    //             merchantAccount.toBuffer(),
    //             Buffer.from(merchantData1.subscriptionCount.toString())
    //
    //         ],
    //         program.programId
    //     );
    //
    //     current_period_end = Date.now() + 24 * 60 * 60 * 1000
    //     console.log('current_period_end 2', current_period_end)
    //
    //     await program.methods
    //         .initializeSubscription(
    //             merchantAccount,
    //             customerAccount,
    //             lastInvoice,
    //             new anchor.BN(current_period_end),
    //         )
    //         .accounts({
    //             merchantAccount: merchantAccount,
    //             subscriptionAccount: subscriptionAccount1,
    //             merchant: globalState.merchantWallet.publicKey,
    //             systemProgram: SystemProgram.programId,
    //         })
    //         .signers([globalState.merchantWallet.payer])
    //         .rpc();
    //
    //     const dataSubscriptionAccount1 = await program.account.subscription.fetch(
    //         subscriptionAccount1
    //     );
    //     console.log(subscriptionAccount1)
    //     console.log(dataSubscriptionAccount1);
    //     const merchantData2 = await program.account.merchant.fetch(merchantAccount);
    //     console.log(merchantData2)
    //
    //     let pythPriceAccount = new PublicKey("H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG") // SOL/USD
    //
    //     await program.methods.
    //         subscribe()
    //         .accounts({
    //             subscriptionAccount: subscriptionAccount,
    //             systemProgram: SystemProgram.programId,
    //             pythPriceAccount: pythPriceAccount,
    //             payer: globalState.merchantWallet.publicKey,
    //         })
    //         .signers([globalState.merchantWallet.payer])
    //         .rpc();
    //
    // })
});

