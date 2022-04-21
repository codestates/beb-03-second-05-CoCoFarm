import lightwallet from "eth-lightwallet";

import { config } from "../config.js";
const newWallet = async (password, callback) => {
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
          let a = callback(address, privatekey);
        });
      }
    );
    const result = a;
    return;
  } catch (err) {
    console.log(err);
  }
};

function getKey(address, privatekey) {
  const result = {
    address,
    privatekey,
  };
  console.log(result);
  return result;
}

const data = newWallet("ehdrb", getKey);
console.log(data);

export default newWallet;
