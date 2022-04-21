import lightwallet, { keystore } from "eth-lightwallet";

const newWallet = async (password) => {
  try {
    const mnemonic = lightwallet.keystore.generateRandomSeed();
  } catch (err) {
    console.log(err);
  }
};
