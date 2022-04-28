import ServerAccount from "./ServerAccounts.js";
import User from "../model/users.js";
import Post from "../model/post.js";
const reward = async () => {
  try {
    // 먼저 rewardCount 5인 post들 긁어모음.
    console.log("보상시작");
    const posts = await Post.find({ rewardCount: { $gte: 5 } });
    console.log(posts);
    // rewardCount >= 5 이상인것들 찾아옴.
    if (posts.length === 0) {
      return "보상을 할 것이 없습니다.";
    } else {
      await Promise.all(
        posts.map(async (post) => {
          console.log(post);
          await Post.findByIdAndUpdate(post._id, {
            rewardCount: post.rewardCount % 5,
          });
        })
      );
      await Promise.all(
        posts.map(async (post) => {
          const amount = parseInt(post.rewardCount / 5);
          const user = await User.findOne({ nickName: post.author });
          await ServerAccount.rewardToken(user.wallet.address, 5);
          // 나중에 5 -> amount 해줘야함.
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export default reward;
