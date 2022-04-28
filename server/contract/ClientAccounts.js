import { ethers } from "ethers";
import abi from "./abi.js";
import nftAbi from "./nftAbi.js";
import provider from "./provider.js";
import { config } from "../config.js";

const CA = config.CA;
const NFTAddress = config.NFT;
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
      return number;
    } catch (err) {
      console.log(err);
    }
  }
  async balanceOfNFT() {
    try {
      const contract = new ethers.Contract(NFTAddress, nftAbi, this.wallet);
      const amount = await contract.balanceOf(this.wallet.address);
      const result = amount.toString();
      console.log(`보유하신 nft 갯수는 = ${amount}`);

      return result;
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
  a;
  async isOwner() {
    try {
      const contract = new ethers.Contract(CA, abi, this.wallet);
      const result = await contract.isOwner(this.wallet.address);
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  // agenda = JSON.stringfy({})
  async uploadOpinion(agenda) {
    try {
      const contract = new ethers.Contract(CA, abi, this.wallet);
      const result = await contract.listenMyopinion(agenda);
      console.log(`안건 발의 완료 = ${result}`);
    } catch (err) {
      console.log(err);
    }
  }

  async agreeOpinion(agenda) {
    try {
      const contract = new ethers.Contract(CA, abi, this.wallet);
      const result = await contract.voteYouropinion(agenda);
      console.log(`투표 완료 = ${result}`);
    } catch (err) {
      console.log(err);
    }
  }
}

export default ClientAccounts;
