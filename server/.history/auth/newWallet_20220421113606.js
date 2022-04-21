import lightwallet, { keystore } from "eth-lightwallet";

const newWallet = async (password) => {
  try{  
    const mnemonic = await lightwallet.keystore.generateRandomSeed();
    console.log(mnemonic);
    const seed = 
  
  
  
  }catch(err){
    console.log(err)
  }



};
