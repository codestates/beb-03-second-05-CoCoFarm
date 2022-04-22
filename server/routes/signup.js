import express from "express";
import { promises as fs } from "fs";

import { createToken } from "../auth/jwt.js";
import User from "../model/users.js";
import { hashedPassword } from "../auth/password.js";
import newWallet from "../wallet/newWallet.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { nickName, password, email, phoneNumber } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      res
        .status(400)
        .send({ success: false, message: "You are already signed up" });
    } else {
      // 개인키,주소 생성해서 wallet.json 파일 생성
      await newWallet(password);
      let wallet;
      const data = await fs.readFile("./wallet.json", "utf8");
      wallet = JSON.parse(data);

      // 읽었으면 파일 삭제
      fs.unlink("./wallet.json", (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("삭제완료");
        }
      });
      const userSchema = {
        nickName,
        password: await hashedPassword(password),
        email,
        phoneNumber,
        wallet,
      };

      const user = await User.create(userSchema);

      // createToken 함수에서 이미 password 빼고 만듬.
      const token = createToken(user);
      res
        .status(200)
        .cookie("jwt", token)
        .send({ success: true, message: "회원가입 성공!" });
    }
  } catch (err) {
    res.status(400).send({ success: false, message: "You Don't signup", err });
  }
});

export default router;
