import lightwallet from "eth-lightwallet";

const newWallet = async (password) => {
  const mnemonic = lightwallet.keystore.generateRandomSeed();
  console.log(mnemonic);
  const seed = lightwallet.keystore.createVault();
  return {
    mnemonic,
  };
};
