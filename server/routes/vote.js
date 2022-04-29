import express from "express";
import { decodingToken } from "../auth/decodingToken.js";
import { ObjectId } from "mongodb";
import User from "../model/users.js";

import votePost from "../model/vote.js";
import createIPFS from "../contract/createIpfs.js";
import ServerAccount from "../contract/ServerAccounts.js";
import ClientAccounts from "../contract/ClientAccounts.js";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const data = decodingToken(token);

    const { nickName } = data;
    const user = await User.findOne({ nickName });

    const { admin } = user;

    const votePostList = await votePost.find();
    // console.log(`votePostList = ${votePostList}`);
    const result = votePostList.map((post) => {
      const timeStamp = ObjectId(post.id).getTimestamp() + 9;
      const isVote = post.agreeVoters.includes(nickName);
      const { title, content, agreeVoters, author, _id } = post;
      // console.log(`post = ${post}`);
      return {
        timeStamp,
        isVote,
        title,
        content,
        agreeVoters,
        author,
        p_id: _id,
      };
    });
    const totalAdmin = await User.find({ admin: true });
    console.log(totalAdmin);
    res.status(200).send({
      admin,
      votePost: result,
      totalAdmin: totalAdmin.length,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "포스트가 없습니다.",
    });
  }
});

router.post("/posting", async (req, res) => {
  const token = req.cookies.jwt;
  const data = decodingToken(token);
  const { nickName } = data;
  const { title, content } = req.body;
  try {
    const user = await User.findOne({ nickName });

    if (user.admin) {
      const metaData = {
        timeStamp: new Date(),
        author: nickName,
        title,
        content,
      };
      const url = await createIPFS(metaData);
      const mint = await ServerAccount.mintNFT(user.wallet.address, url);
      console.log(mint);
      const client = new ClientAccounts(user.wallet);

      const upload = await client.uploadOpinion(JSON.stringify(metaData));
      console.log(`안건이 컨트랙트에 올라갔습니다. =  ${upload}`);

      const postSchema = {
        url,
        author: nickName,
        title,
        content,
        agreeVoters: [nickName],
      };
      await votePost.create(postSchema);

      res
        .status(200)
        .send({ votePost: metaData, message: "투표안건을 올리셨습니다." });
    } else {
      res.status(400).send({ message: "권한이 없습니다." });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "투표를 올리지 못했습니다." });
  }
});

router.post("/agree", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const data = decodingToken(token);
    const { nickName } = data;
    const { p_id } = req.body;
    // votepost를 find로 찾아온다음에
    // agreeVoters에 user가 등록되어있는지 확인

    console.log(`p_id:${p_id}`);
    // PersonModel.find({ favouriteFoods: "sushi" }, ...);
    const agreeCheck = await votePost.findOne({ _id: p_id });

    if (!agreeCheck.agreeVoters.includes(nickName)) {
      await votePost.findOneAndUpdate(
        { _id: p_id },
        { $push: { agreeVoters: nickName } }
      );

      const user = await User.findOne({ nickName });
      console.log(user);
      const { wallet } = user;
      const { url } = agreeCheck;
      console.log(`url  = ${url}`);
      const metaData = await axios.get(url);
      console.log(metaData.data);
      const client = new ClientAccounts(wallet.address);
      await client.agreeOpinion(metaData);
      res
        .status(200)
        .send({ message: "투표가 완료되었습니다.", success: true });
    } else {
      res.send({ message: "이미 투표하셨습니다.", success: false });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "오류" });
  }
});

export default router;
