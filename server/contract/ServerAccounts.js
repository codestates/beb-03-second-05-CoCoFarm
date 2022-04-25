import { ethers } from "ethers";
import provider from "./provider.js";
import abi from "../contract/abi.js";
const privateKey =
  "cf36b9064c497b8d360b351271a519ce0019371465140346c851285173489cf5";

const CA = "0xf64b6819819Ac48c3CAA2517941b5653FD8dc8c7";
const wallet = new ethers.Wallet(privateKey, provider);
const erc20 = new ethers.Contract(CA, abi, wallet);

class ServerAccounts {
  constructor() {
    this.wallet = wallet;
    this.contract = erc20;
  }

  async totalSupply() {
    try {
      const total = await this.contract.totalSupply();
      const number = await total.toNumber();
      console.log(number);
      return number;
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

// 실험중

const Server = new ServerAccounts();

Server.rewardToken("0x26Ece52EbB747c589F2a89B45b3De09468780914", 100);
Server.totalSupply();
export default Server;
