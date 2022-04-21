import lightwallet, { keystore } from "eth-lightwallet";

const newWallet = async (password) => {
  try{  const mnemonic = lightwallet.keystore.generateRandomSeed();
    console.log(mnemonic);
    const 
    return {
      mnemonic,
    };
  
  
  }catch(err){
    console.log(err)
  }



};
