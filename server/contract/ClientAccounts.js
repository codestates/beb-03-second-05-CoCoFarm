import { ethers } from "ethers";
import abi from "../contract/abi.js";

import provider from "./provider.js";

const CA = "0x33241e39f8d9f3a21De5681E6A327745E22f4C5F";
class ClientAccounts {
  constructor(privateKey) {
    this.wallet = new ethers.Wallet(privateKey, provider);
    this.contract = new ethers.Contract(CA, abi, this.wallet);
  }

  //이더 후원하기
  async support(to, amount) {
    try {
      const tx = await this.contract.transferFrom(this.wallet, to, amount);
      const result = await tx.wait();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
}

// 실험중
const client = new ClientAccounts("0xb01475c503081e491518ECA4faB9b89bFb3f0813");
console.log(client.support("0x402E14c316fB674c979F6F828901f971Cb05FA9a", 1));
export default ClientAccounts;
