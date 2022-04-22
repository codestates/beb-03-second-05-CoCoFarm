import express from "express";
import User from "../model/users.js";
import { hashedPassword } from "../auth/password.js";
const router = express.Router();

router.get("/:nickname", async (req, res) => {
  const { nickname } = req.params;

  try {
    const user = await User.findOne({ nickName: nickname });
    console.log(user);
    // 토큰 잔액 추가해줘야함.
    const { nickName, email, avartar, posts } = user;
    res.send({ nickName, email, avartar, posts });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버에서 읽을수가 없습니다." });
  }
});

router.post("/:nickName", async (req, res) => {
  try {
    const { nickName } = req.params;
    const userSchema = req.body;
    if (userSchema.password !== undefined) {
      userSchema.password = hashedPassword(userSchema.password);
    }
    const user1 = await User.findOneAndUpdate(
      { nickName: nickName },
      userSchema,
      { new: true }
    );
    console.log(user1);
    res.status(200).send({ message: "회원정보 수정이 완료 되었습니다." });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "회원정보 수정에 실패했습니다." });
  }
});

export default router;
