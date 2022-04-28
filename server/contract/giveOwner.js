import ServerAccount from "./ServerAccounts.js";

// 권한 계정 목록 받아서 오너십 추가
const giveOwner = async (toAddress) => {
  await ServerAccount.giveOwnership(toAddress);
};

export default giveOwner;
