import lightwallet from "eth-lightwallet";
import { config } from "../config.js";
const newWallet = async (password) => {
  try {
    await lightwallet.keystore.createVault(
      {
        password,
        seedPharse: lightwallet.keystore.generateRandomSeed(),
        salt: config.seed_salt,
      },
      (err, ks) => {
        ks.keyFromPassword(password, (err, pwDerivedKey) => {
          // if (err) throw err;

          ks.generateNewAddress(pwDerivedKey, 1);
          const address = ks.getAddresses().toString();
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
newWallet("EHDRB");
export default newWallet;
