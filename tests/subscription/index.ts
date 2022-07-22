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
            .initializeMerchant(
                "MaiusPay",
                "Awesome store",
                "https://i.pravatar.cc/300",
            )
            .accounts({
                merchant: merchantAccount,
                genesisCustomer: customerAccount,
                merchantWallet: globalState.merchantWallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .signers([globalState.merchantWallet.payer])
            .rpc();

        const data = await program.account.merchant.fetch(merchantAccount);
        console.log("[Merchant] Create result: ", data);
    });

    it("initialize subscription", async () => {
        const merchantData = await program.account.merchant.fetch(merchantAccount);
        let lastInvoice: anchor.web3.PublicKey;
        [subscriptionAccount, subscriptionBump] = await PublicKey.findProgramAddress(
            [
                Buffer.from("v1"),
                Buffer.from("subscription"),
                merchantAccount.toBuffer(),
                Buffer.from(merchantData.subscriptionCount.toString())

            ],
            program.programId
        );
        await program.methods
            .initializeSubscription(
                merchantAccount,
                customerAccount,
                lastInvoice
            )
            .accounts({
                merchantAccount: merchantAccount,
                subscriptionAccount: subscriptionAccount,
                customerAccount: customerAccount,
                merchant: globalState.merchantWallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .signers([globalState.merchantWallet.payer])
            .rpc();

        const dataSubscriptionAccount = await program.account.subscription.fetch(
            subscriptionAccount
        );
        console.log(dataSubscriptionAccount);
        const merchantData1 = await program.account.merchant.fetch(merchantAccount);

        [subscriptionAccount1, subscriptionBump1] = await PublicKey.findProgramAddress(
            [
                Buffer.from("v1"),
                Buffer.from("subscription"),
                merchantAccount.toBuffer(),
                Buffer.from(merchantData1.subscriptionCount.toString())

            ],
            program.programId
        );
        await program.methods
            .initializeSubscription(
                merchantAccount,
                customerAccount,
                lastInvoice
            )
            .accounts({
                merchantAccount: merchantAccount,
                subscriptionAccount: subscriptionAccount1,
                customerAccount: customerAccount,
                merchant: globalState.merchantWallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .signers([globalState.merchantWallet.payer])
            .rpc();

        const dataSubscriptionAccount1 = await program.account.subscription.fetch(
            subscriptionAccount1
        );
        console.log(subscriptionAccount1)
        console.log(dataSubscriptionAccount1);
        const merchantData2 = await program.account.merchant.fetch(merchantAccount);
        console.log(merchantData2)

        //   throw new Error('Should not be error')
        // } catch (e) {
        //   console.log('After merchantWallet SOL amount:', e);
        // }
    });

});

