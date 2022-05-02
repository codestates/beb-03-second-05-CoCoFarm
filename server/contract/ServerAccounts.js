import { ethers } from "ethers";
import provider from "./provider.js";
import abi from "./abi.js";
import { config } from "../config.js";
import nftAbi from "./nftAbi.js";

const privateKey = config.ServerPriveKey;

const CA = config.CA;
const nftAddress = config.NFT;
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
      return number;
    } catch (err) {
      console.log(err);
    }
  }

  // 보상으로 토큰 전달
  async rewardToken(toAddress, amount) {
    try {
      const sendToken = await this.contract.transfer(toAddress, amount);
      await sendToken.wait();
      console.log("토큰전송 완료");
      const transaction = {
        to: toAddress,
        value: ethers.utils.parseEther("0.001"),
      };
      const sendEther = await this.wallet.sendTransaction(transaction);
      await sendEther.wait();
      console.log("이더 전송 완료");
    } catch (err) {
      console.log(err);
    }
  }

  async mintNFT(toAddress, url) {
    const contract = new ethers.Contract(nftAddress, nftAbi, this.wallet);
    const tx = await contract.mintNFT(toAddress, url);
    const result = await tx.wait();
    return result;
  }

  async isOwner() {
    try {
      const result = await this.contract.isOwner(this.wallet.address);
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  async giveOwnership(toAddress) {
    try {
      const result = await this.contract.giveOwnership(toAddress);
      console.log("권한을 줬습니다.");
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

const ServerAccount = new ServerAccounts();
// ServerAccount.balanceOf().then((result) =>
//   console.log(`서버 남은 토큰:${result}`)
// );
const isOwer = await ServerAccount.isOwner();
console.log(`Server is Owner = ${isOwer}`);
export default ServerAccount;
