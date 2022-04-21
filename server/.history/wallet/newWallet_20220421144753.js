import lightwallet from "eth-lightwallet";
import { hashedPassword } from "../auth/password.js";
import { config } from "../config.js";
const newWallet = async (password) => {
  try {
    const mnemonic = await lightwallet.keystore.generateRandomSeed();
    // console.log(mnemonic);
    const result = await lightwallet.keystore.createVault(
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
          address = ks.getAddresses().toString();

          privatekey = ks.exportPrivateKey(address, pwDerivedKey);
        });
      }
    );

    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

export default newWallet;
