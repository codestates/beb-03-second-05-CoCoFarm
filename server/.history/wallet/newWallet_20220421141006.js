import lightwallet from "eth-lightwallet";
import { config } from "../config.js";
const newWallet = (password) => {
  try {
    lightwallet.keystore.createVault(
      {
        password,
        seedPharse: lightwallet.keystore.generateRandomSeed(),
        salt: config.seed_salt,
      },
      (err, ks) => {
        ks.keyFromPassword(password, (err, pwDerivedKey) => {
          console.log(ks);
          if (err) throw err;

          ks.generateNewAddress(pwDerivedKey, 1);
          const address = ks.getAddresses().toString();
          // const keystore = ks.serialize();
          console.log(address);
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
newWallet("ehdrb");
export default newWallet;
