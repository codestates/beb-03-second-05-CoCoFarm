import lightwallet, { keystore } from "eth-lightwallet";
import { config } from "../config";
const newWallet = async (password) => {
  try {
    const mnemonic = await lightwallet.keystore.generateRandomSeed();
  } catch (err) {
    console.log(err);
  }
};
