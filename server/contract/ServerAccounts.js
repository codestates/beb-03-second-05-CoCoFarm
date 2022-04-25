import { ethers } from "ethers";
import provider from "./provider.js";
import abi from "./abi.js";
const privateKey =
  "cf36b9064c497b8d360b351271a519ce0019371465140346c851285173489cf5";

const CA = "0xfFEd53a81b5b5371Cfaef55d0040c04E31D24A59";
const wallet = new ethers.Wallet(privateKey, provider);
const erc20 = new ethers.Contract(CA, abi, wallet);

class ServerAccounts {
  constructor() {
    this.wallet = wallet;
    this.contract = erc20;
  }
  // 현재 서버가 가지고 있는 토큰 확인
  async balanceOf() {
    try {
      const amount = await this.contract.balanceOf(this.wallet.address);
      const number = await amount.toNumber();
      console.log(number);
    } catch (err) {
      console.log(err);
    }
  }

  // 보상으로 토큰 전달
  async rewardToken(toAddress, amount) {
    try {
      const tx = await this.contract.transfer(toAddress, amount);
      const result = await tx.wait();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
}

const ServerAccount = new ServerAccounts();
ServerAccount.balanceOf();
export default ServerAccount;