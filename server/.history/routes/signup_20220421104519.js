import express from "express";

import { createToken } from "../auth/jwt.js";
import User from "../model/users.js";
import { hashedPassword } from "../auth/password.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password, email, phoneNumber, wallet } = req.body;
  try {
    // email, wallet이 있으면 res.status(400).send({message:'이미 존재하는 계정입니다.'})
    // email,wallet이 없으면 res.status(200).send({message:'회원가입 성공}) 토큰 전송
    const query = await User.findOne({ email, wallet });
    console.log(query);
    if (query) {
      res
        .status(400)
        .send({ success: false, message: "You are already signed up" });
    } else {
      const userSchema = {
        username,
        password: hashedPassword(password),
        email,
        phoneNumber,
        wallet,
      };

      const user = await User.create(userSchema);
      console.log(user);
      delete userSchema.password;
      const token = createToken(userSchema);
      res
        .status(200)
        .header({ Authorization: `Bearer ${token}` })
        .send({ success: true, message: "회원가입 성공!" });
    }
  } catch (err) {
    res.status(400).send({ success: false, message: "You Don't signup", err });
  }
});

export default router;
