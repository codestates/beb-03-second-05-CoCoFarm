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
      function (err, ks) {
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
