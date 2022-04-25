import express from "express";
import { decodingToken } from "../auth/decodingToken.js";
import ClientAccounts from "../contract/ClientAccounts.js";
import Post from "../model/post.js";
import User from "../model/users.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = decodingToken(req.cookies.jwt);
    // 전송할 토큰 양
    const amount = req.body.amount;
    console.log(req.body);
    // 보내는 이
    const toUser = await User.findOne({ nickName: data.nickName });
    const toPrivKey = toUser.wallet.privateKey;
    const client = new ClientAccounts(toPrivKey);
    const clientToken = await client.balanceOf();
    if (clientToken < amount) {
      res.status(400).send({ message: "토큰 보유량이 적스빈다." });
    }

    // 받는이
    const post = await Post.findOne({ _id: req.body.c_id });
    console.log(post);
    const author = post.author;

    const fromUser = await User.findOne({ nickName: author });
    const toAddress = fromUser.wallet.address;

    // 토큰 보내는 로직
    const result = await client.support(toAddress, amount);
    console.log(result);
    res.status(200).send({ message: "토큰 전송이 완료 되었습니다." });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "토큰 전송이 실패되었습니다.", err });
  }
});
export default router;
