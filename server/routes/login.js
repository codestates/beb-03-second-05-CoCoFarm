import express from "express";

import { createToken } from "../auth/jwt.js";
import { comparePassword } from "../auth/password.js";
import User from "../model/users.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
  try {
    const user = await User.findOne({ email });
    if (user === null) {
      res
        .status(400)
        .send({ success: false, message: "가입이 되어있지 않습니다." });
    }

    const result = await comparePassword(password, user.password);
    // console.log(result);
    if (result) {
      const token = createToken(user);
      console.log(token);
      res
        .set({ "Access-Control-Allow-Credentials": true })
        .status(200)
        .cookie("jwt", token, {
          sameSite: "none",
          httpOnly: true,
          secure: true,
          domain: "cocofarm.herokuapp.com",
        })
        .send({
          nickName: user.nickName,
          success: true,
          message: "로그인 성공",
        });
    } else {
      res.status(400).send({ success: false, message: "You Don't login", err });
    }
  } catch (err) {
    res
      .status(400)
      .send({ success: false, message: "비밀번호를 정확히 입력하세요." });
  }
});

export default router;
