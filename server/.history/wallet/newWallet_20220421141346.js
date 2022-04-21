import lightwallet from "eth-lightwallet";
import { config } from "../config.js";
const newWallet = async (password) => {
  try {
    const mnemonic = lightwallet.keystore.generateRandomSeed();
    console.log(mnemonic);
    lightwallet.keystore.createVault(
      {
        password,
        seedPharse: mnemonic,
        salt: config.seed_salt,
      },
      (err, ks) => {
        ks.keyFromPassword(password, (err, pwDerivedKey) => {
          ks.generateNewAddress(pwDerivedKey, 1);
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
};
newWallet("ehdrb");
export default newWallet;
