import express from "express";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import Post from "../model/post.js";

const router = express.Router();

export default router;

router.put("/", async (req, res) => {
  // const token = req.headers["authorization"];
  const token = req.cookies.jwt;
  const data = jwt.verify(token, config.secretKey, (error, decoded) => {
    if (error) {
      console.log(error);
    } else {
      return decoded;
    }
  });

  const author = data.username;
  const { p_id, title, content } = req.body;

  const postSchema = {
    author,
    title,
    content,
  };

  try {
    await Post.updateOne({ _id: p_id }, postSchema);
    res.status(200).send({ message: "게시물이 수정되었습니다." });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "게시물 수정에 실패했습니다." });
  }
});
