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

  try {
    const newComment = { author, comment };
    const post = await Post.findOne({ _id: ObjectId(p_id) });
    const { rewardCount } = post;
    await Post.updateOne(
      { _id: ObjectId(p_id) },
      { comments: [...post.comments, newComment], rewardCount: rewardCount + 1 }
    );
    res.status(200).send({ message: "댓글이 등록되었습니다." });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "댓글 등록에 실패했습니다." });
  }
});

router.delete("/", async (req, res) => {
  // 댓글 삭제
  // 댓글 id를 찾아서 댓글 배열에서 해당 댓글 삭제

  const { p_id, c_id } = req.body;

  try {
    const post = await Post.findOne({ _id: ObjectId(p_id) });
    const comments = post.comments;
    const deleteComments = comments.filter((comment) => {
      return comment.id !== c_id;
    });

    await Post.updateOne({ _id: ObjectId(p_id) }, { comments: deleteComments });
    res.status(200).send({ message: "댓글을 삭제했습니다." });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "댓글 삭제에 실패했습니다." });
  }
});

export default router;
