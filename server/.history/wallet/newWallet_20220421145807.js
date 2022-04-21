import lightwallet from "eth-lightwallet";

import { config } from "../config.js";
const newWallet = (password) => {
  try {
    const mnemonic = lightwallet.keystore.generateRandomSeed();
    var address;
    var privatekey;
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
          var address = ks.getAddresses().toString();

          var privatekey = ks.exportPrivateKey(address, pwDerivedKey);
        });
      }
    );
    console.log(address, privatekey);
  } catch (err) {
    console.log(err);
  }
};

export default newWallet;
