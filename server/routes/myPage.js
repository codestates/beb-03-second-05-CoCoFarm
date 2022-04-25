import express from "express";
import User from "../model/users.js";
import { ObjectId } from "mongodb";
import { hashedPassword } from "../auth/password.js";
import { decodingToken } from "../auth/decodingToken.js";
import Post from "../model/post.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const token = req.cookies.jwt;
  const data = decodingToken(token);
  console.log(data);
  const nickname = data.nickName;
  console.log(nickname);
  try {
    const user = await User.findOne({ nickName: nickname });
    console.log(user);
    // 토큰 잔액 추가해줘야함.
    const { nickName, email, avartar, posts } = user;

    const mapPosts = await Promise.all(
      posts.map((postId) => {
        return Post.findOne({ _id: ObjectId(postId) });
      })
    );

    res.send({ nickName, email, avartar, posts: mapPosts });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버에서 읽을수가 없습니다." });
  }
});

router.post("/:nickName", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const data = decodingToken(token);
    const nickName = data.nickName;
    const userSchema = req.body;
    if (userSchema.password !== undefined) {
      userSchema.password = hashedPassword(userSchema.password);
    }
    const user1 = await User.findOneAndUpdate({ nickName }, userSchema, {
      new: true,
    });
    console.log(user1);
    res.status(200).send({ message: "회원정보 수정이 완료 되었습니다." });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "회원정보 수정에 실패했습니다." });
  }
});

export default router;
