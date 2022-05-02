import express from "express";

import { decodingToken } from "../auth/decodingToken.js";
import Post from "../model/post.js";
import User from "../model/users.js";
import createIPFS from "../contract/createIpfs.js";
import ServerAccount from "../contract/ServerAccounts.js";

const router = express.Router();

router.post("/", async (req, res) => {
  // 헤더의 jwtToken으로 글 작성자 추출
  // body : title, content
  // db에는 author, title, content, comments

  // const token = req.headers["authorization"];
  const data = decodingToken(req.cookies.jwt);
  console.log(data);
  const author = data.nickName;
  const email = data.email;
  const { title, content } = req.body;

  //ipfs 에 저장되는 메타데이터
  const metaData = {
    timeStamp: new Date(),
    email,
    title,
    content,
  };
  // 게시물 작성한거를 유저의 posts에도 추가
  try {
    const user = await User.findOne({ nickName: author });
    const url = await createIPFS(metaData);
    console.log(url);
    const authorId = user.id;
    const postSchema = {
      url,
      author,
      authorId,
      title,
      content,
      comments: [],
    };

    const { wallet } = user;
    const { address } = wallet;
    console.log(address);
    const mint = await ServerAccount.mintNFT(address, url);
    console.log(mint);

    await Post.create(postSchema);
    const newPostId = await Post.findOne(postSchema);
    const userPosts = await User.findOne({ email: email });
    await User.updateOne(
      { email: email },
      { posts: [...userPosts["posts"], newPostId.id] }
    );
    res.status(200).send({ message: "게시물이 등록되었습니다." });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "게시물 등록에 실패했습니다." });
  }
});

export default router;
