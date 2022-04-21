import lightwallet, { keystore } from "eth-lightwallet";

const newWallet = async (password) => {
  try {
    const mnemonic = await lightwallet.keystore.generateRandomSeed();
    console.log(mnemonic);
    let seed;
    let address;
    lightwallet.keystore.createVault(
      {
        password,
        seedParse: mnemonic,
        hdPathString: "m/0'/0'/0'",
      },
      (err, ks) => {
        ks.keyFromPassword(password, (err, pwDerivedKey) => {
          ks.generateNewAddress(pwDerivedKey, 1);
          address = ks.getAdresses().toString();
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
};
