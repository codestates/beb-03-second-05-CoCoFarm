import User from "../model/users.js";
import ClientAccounts from "./ClientAccounts.js";

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
        const adminUpdate = await User.updateMany(
          { tokenBalance: { $gte: 5 } },
          { admin: true }
        );
        // console.log(adminUpdate);
        console.log(`adminUpdeate = ${adminUpdate}`);
      })
    );
  } catch (err) {
    console.log(err);
  }
};

export default tokenUpdate;
