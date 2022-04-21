import lightwallet, { keystore } from "eth-lightwallet";

const newWallet = async (password) => {
  try {
    const mnemonic = await lightwallet.keystore.generateRandomSeed();
  } catch (err) {
    console.log(err);
  }
};
