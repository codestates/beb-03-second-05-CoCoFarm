import express from "express";
import { ObjectId } from "mongodb";
import { decodingToken } from "../auth/decodingToken.js";
import Post from "../model/post.js";

const router = express.Router();

router.get("/", async (req, res) => {
  // p_id로 posts에서 조회해서 가져오고
  // author, title, content, timestamp, comments
  const p_id = req.query.p_id;
  const data = decodingToken(req.cookies.jwt);
  try {
    const post = await Post.findOne({ _id: ObjectId(p_id) });
    let body = {
      author: post.author,
      title: post.title,
      content: post.content,
      comments: post.comments,
      timestamp: ObjectId(p_id).getTimestamp(),
      commentsCount: post.comments.length,
      likeCount: post.wholiked.length,
      like: post.wholiked.includes(data.username),
    };

    res.status(200).send({ post: body });
  } catch (err) {
    res.status(400).send({ message: "게시물을 불러오는데 실패했습니다." });
  }
});

export default router;
