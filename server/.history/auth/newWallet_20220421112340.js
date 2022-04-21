import lightwallet from "eth-lightwallet";

const newWallet = async () => {
  const mnemonic = lightwallet.keystore.generateRandomSeed();
  return mnemonic;
};
