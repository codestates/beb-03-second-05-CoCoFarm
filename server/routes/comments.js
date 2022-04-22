import express from "express";
import { ObjectId } from "mongodb";
import { decodingToken } from "../auth/decodingToken.js";
import Post from "../model/post.js";

const router = express.Router();

router.post("/", async (req, res) => {
  // post db : p_id, author, title, content, comments
  // p_id와 comment가 들어오면 p_id로 검색
  // token에서 댓글 작성자 추출
  // comments 부분을 업데이트

  // const token = req.headers["authorization"];
  const data = decodingToken(req.cookies.jwt);

  const author = data.nickName;
  const { p_id, comment } = req.body;

  const post = await Post.findOne({ id: ObjectId(p_id) });
});

export default router;
