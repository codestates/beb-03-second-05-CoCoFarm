import lightwallet from "eth-lightwallet";
import { config } from "../config.js";
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
          const address = ks.getAddresses();
          const keystore = ks.serialize();
          console.log(address, keystore);
          // return {
          //   address,
          //   keystore,
          // };
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export default newWallet;
