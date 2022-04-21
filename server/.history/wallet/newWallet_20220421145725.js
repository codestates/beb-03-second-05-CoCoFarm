import lightwallet from "eth-lightwallet";

import { config } from "../config.js";
const newWallet = (password) => {
  try {
    const mnemonic = lightwallet.keystore.generateRandomSeed();

    lightwallet.keystore.createVault(
      {
        password: password,
        seedPhrase: mnemonic,
        salt: config.seed_salt,
        hdPathString: "m/0'/0'/0'",
      },
      (err, ks) => {
        if (err) throw err;
        ks.keyFromPassword(password, (err, pwDerivedKey) => {
          // console.log(pwDerivedKey);
          ks.generateNewAddress(pwDerivedKey, 1);
          const address = ks.getAddresses().toString();

          const privatekey = ks.exportPrivateKey(address, pwDerivedKey);
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export default newWallet;
