import lightwallet, { keystore } from "eth-lightwallet";

const newWallet = async (password) => {
  try {
    const mnemonic = await lightwallet.keystore.generateRandomSeed();
    console.log(mnemonic);
    const seed = lightwallet.keystore.createVault({
      password,
      seedParse: mnemonic,
      hdPathString: "m/0'/0'/0'",
    });
  } catch (err) {
    console.log(err);
  }
};
