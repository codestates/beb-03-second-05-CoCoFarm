import lightwallet from "eth-lightwallet";

import { config } from "../config.js";

const newWallet = async (password) => {
  try {
    const mnemonic = lightwallet.keystore.generateRandomSeed();

    const result = lightwallet.keystore.createVault(
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
          const result = {
            address,
            privatekey,
          };
          console.log(result);
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export default newWallet;
