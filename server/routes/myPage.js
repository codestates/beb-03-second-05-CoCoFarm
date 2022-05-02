import express from "express";
import { ObjectId } from "mongodb";
import User from "../model/users.js";
import { hashedPassword } from "../auth/password.js";
import { decodingToken } from "../auth/decodingToken.js";
import Post from "../model/post.js";
import ClientAccounts from "../contract/ClientAccounts.js";
import { createToken } from "../auth/jwt.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const token = req.cookies.jwt;

  const data = decodingToken(token);
  const nickname = data.nickName;
  try {
    const user = await User.findOne({ nickName: nickname });

    const client = new ClientAccounts(user.wallet.privateKey);
    let tokenBalance = await client.balanceOf();
    if (tokenBalance === undefined) {
      tokenBalance = 0;
    }

    const { nickName, email, avartar, posts } = user;

    const mapPosts = await Promise.all(
      posts.map((postId) => {
        return Post.findOne({ _id: ObjectId(postId) });
      })
    );
    const nftBalance = await client.balanceOfNFT();
    console.log(`nftBalance = ${nftBalance}`);

    //삭제요망
    const isOwner = await client.isOwner();
    console.log(`Client is Owner ? = ${isOwner}`);
    res.send({
      nickName,
      email,
      avartar,
      posts: mapPosts,
      tokenBalance,
      nftBalance,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버에서 읽을수가 없습니다." });
  }
});

router.post("/:nickName", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const data = decodingToken(token);
    console.log(data);
    const nickname = req.params.nickName;
    console.log(`nickname = ${nickname}`);
    const userSchema = req.body;
    if (userSchema.password !== undefined) {
      userSchema.password = await hashedPassword(userSchema.password);
    }
    const user1 = await User.findOneAndUpdate(
      { nickName: nickname },
      userSchema
    );
    // console.log(user1);
    const newToken = createToken(user1);
    res
      .status(200)
      .cookie("jwt", newToken)
      .send({ message: "회원정보 수정이 완료 되었습니다." });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "회원정보 수정에 실패했습니다." });
  }
});

export default router;
