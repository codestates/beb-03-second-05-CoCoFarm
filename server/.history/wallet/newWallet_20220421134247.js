import lightwallet, { keystore } from "eth-lightwallet";
import { config } from "../config";
const newWallet = async (password) => {
  try {
    const keyStore = lightwallet.keystore;
    const mnemonic = await keyStore.generateRandomSeed();
    await keyStore.createVault(
      {
        password,
        seedPharse: mnemonic,
        salt: config.seed_salt,
      },
      (err, ks) => {
        ks.keyFromPassword(password, (err, pwDerivedKey) => {
          if (err) throw err;
          ks.generateNewAddress(pwDerivedKey, 1);
          let address = ks.getAddresses();
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
};
