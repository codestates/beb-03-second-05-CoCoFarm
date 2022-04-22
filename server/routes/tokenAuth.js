import express from "express";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import User from "../model/users.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.cookies.jwt);
  const token = req.cookies.jwt;

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      res.status(401).send({ message: "유효하지 않은 토큰입니다." });
    } else {
      const { email } = decoded;

      const user = User.findOne(email);
      console.log(user);

      // 또 새로운 토큰 발행해줘야할까..?
      const { nickName } = user;
      res.status(200).send({ email, nickName });
    }
  });
});

export default router;
