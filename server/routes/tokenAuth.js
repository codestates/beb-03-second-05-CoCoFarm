import express from "express";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import User from "../model/users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log(req.cookies.jwt);
  const token = req.cookies.jwt;

  jwt.verify(token, config.secretKey, async (err, decoded) => {
    try {
      const { email } = decoded;

      const user = await User.findOne({ email });

      const { nickName } = user;

      res.status(200).send({ email, nickName });
    } catch (err) {
      res.status(400).send({ message: "유효하지 않은 토큰입니다." });
    }
  });
});

export default router;
