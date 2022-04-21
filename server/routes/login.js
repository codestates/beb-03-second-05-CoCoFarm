import express from "express";
import { token } from "morgan";
import { createToken } from "../auth/jwt.js";
import { comparePassword } from "../auth/password.js";
import User from "../model/users.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const { email, password } = req.body;
  //패스워드 디코딩 ? 해서 비교해야함.

  try {
    const query = await User.findOne({ email });
    if (query === null) {
      res
        .status(400)
        .send({ success: false, message: "가입이 되어있지 않습니다." });
    }

    const result = await comparePassword(password, query.password);
    console.log(result);
    if (result) {
      const token = createToken(query);
      res
        .status(200)
        .header({ Authorization: `Bearer ${token}` })
        .send({ success: true, message: "로그인 성공" });
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
