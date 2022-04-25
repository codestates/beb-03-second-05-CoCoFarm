import { ethers } from "ethers";
const createWallet = async () => {
  const wallet = ethers.Wallet.createRandom();

  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
};

// console.log(createWallet());
export default createWallet;
