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
    const result = comparePassword(password, query.password);
    if (result) {
      const token = createToken(query);

      res
        .status(200)
        .header({ Authorization: `Bearer ${token}` })
        .send({ success: true, message: "로그인 성공" });
    }
  } catch (err) {
    res.status(400).send({ success: false, message: "You Don't login", err });
  }
});

export default router;
