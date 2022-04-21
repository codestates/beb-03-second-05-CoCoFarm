import lightwallet from "eth-lightwallet";
import fs from "fs";
import { config } from "../config.js";
let addressKey;
let privateKey;
const newWallet = async (password) => {
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
          const keySet = {
            address,
            privateKey,
          };
          fs.writeFile("wallet.json", JSON.stringify(keySet), (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log("data");
            }
          });
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

function getKey(a, b) {
  console.log("getKey 실행");
  addressKey = a;
  privateKey = b;
}

export default newWallet;
