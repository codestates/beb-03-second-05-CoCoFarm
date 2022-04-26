import { ethers } from "ethers";
import abi from "./abi.js";

import provider from "./provider.js";
import { config } from "../config.js";

const CA = config.CA;
class ClientAccounts {
  constructor(privateKey) {
    this.wallet = new ethers.Wallet(privateKey, provider);
  }

  // 현재 고객이 보유하고 있는 토큰 확인
  async balanceOf() {
    try {
      const contract = new ethers.Contract(CA, abi, this.wallet);
      const amount = await contract.balanceOf(this.wallet.address);
      const number = await amount.toNumber();

      console.log(number);
      return number;
    } catch (err) {
      console.log(err);
    }
  }
  //이더 후원하기
  async support(toAddress, amount) {
    try {
      const contract = new ethers.Contract(CA, abi, this.wallet);
      const tx = await contract.transfer(toAddress, amount);
      const result = await tx.wait();
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

// 실험중

export default ClientAccounts;
