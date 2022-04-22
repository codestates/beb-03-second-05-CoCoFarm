import express from "express";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import Post from "../model/post.js";

const router = express.Router();

router.post("/", async (req, res) => {
  // post db : p_id, author, title, content, comments
  // p_id와 comment가 들어오면 p_id로 검색
  // token에서 댓글 작성자 추출
  // comments 부분을 업데이트
});

export default router;
