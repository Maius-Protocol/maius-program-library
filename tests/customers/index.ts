const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

export const createCustomers = async (program, provider) => {
  const customerAccount = anchor.web3.Keypair.generate();
  await program.methods.initialize_customer().accounts({
    customer_account: customerAccount.publicKey,
  }).transaction()

  const user = await program.account.userState.fetch(customerAccount.publicKey);
  console.log(user)
  return { user };
}

