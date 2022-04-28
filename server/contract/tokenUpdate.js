import User from "../model/users.js";
import ClientAccounts from "./ClientAccounts.js";
import giveOwner from "./giveOwner.js";

const tokenUpdate = async () => {
  try {
    const userList = await User.find();
    // console.log(`userList = ${userList}`);
    await Promise.all(
      userList.map(async (user) => {
        // console.log(`user = ${user}`);
        // User.updateMany({"created": false}, {"$set":{"created": true}});
        // age: { $gt: '50' }
        const { nickName } = user;
        const client = new ClientAccounts(user.wallet.privateKey);
        const tokenBalance = await client.balanceOf();
        const result = await User.findOneAndUpdate(
          { nickName },
          { tokenBalance }
        );
        console.log(`tokenBlance 업데이트 완료 ${result}`);
      })
    );
    const tokenRich = await User.find().and([
      { tokenBalance: { $gte: 5 } },
      { admin: false },
    ]);

    await Promise.all(
      tokenRich.map(async (user) => {
        await giveOwner(user.wallet.address);
        console.log(`${user} 컨트랙트 권한 부여`);
      })
    );

    const adminTrue = await User.updateMany(
      { tokenBalance: { $gte: 5 } },
      { admin: true }
    );
    console.log(`admin -> true = ${adminTrue}`);
    const adminFalse = await User.updateMany(
      { tokenBalance: { $lte: 4 } },
      { admin: false }
    );
    console.log(`admin -> false = ${adminFalse}`);
  } catch (err) {
    console.log(err);
  }
};

export default tokenUpdate;
