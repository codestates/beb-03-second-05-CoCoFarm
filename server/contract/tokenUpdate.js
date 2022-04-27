import User from "../model/users.js";
import ClientAccounts from "./ClientAccounts.js";

const tokenUpdate = async () => {
  try {
    const userList = await User.find();
    console.log(`userList = ${userList}`);
    await Promise.all(
      userList.map(async (user) => {
        console.log(`user = ${user}`);
        const { nickName } = user;
        const client = new ClientAccounts(user.wallet.privateKey);
        const tokenBalance = await client.balanceOf();
        const result = await User.findByIdAndUpdate(
          { nickName },
          { tokenBalance }
        );
        console.log(result);
      })
    );
  } catch (err) {
    console.log(err);
  }
};

export default tokenUpdate;
