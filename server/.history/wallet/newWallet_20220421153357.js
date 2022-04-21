import lightwallet from "eth-lightwallet";

import { config } from "../config.js";
let addressKey;
let privateKey;
const newWallet = async (password) => {
  try {
    const mnemonic = lightwallet.keystore.generateRandomSeed();

    const key = lightwallet.keystore.createVault(
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
          getKey(address, privateKey);

          return result;
        });
      }
    );
    console.log(key);
    return key;
  } catch (err) {
    console.log(err);
  }
};

function getKey(a, b) {
  addressKey = a;
  privateKey = b;
}

console.log(addressKey, privateKey);

export default newWallet;
