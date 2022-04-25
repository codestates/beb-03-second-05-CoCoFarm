import express from "express";
import { ObjectId } from "mongodb";
import { decodingToken } from "../auth/decodingToken.js";
import Post from "../model/post.js";

const router = express.Router();

router.post("/", async (req, res) => {
  // 좋아요를 누르면 post wholiked에 추가
  // 이미 wholiked에 있다면 제거 (좋아요 취소)
  const data = decodingToken(req.cookies.jwt);

  const nickName = data.nickName;
  const { p_id } = req.body;

  try {
    const post = await Post.findOne({ _id: ObjectId(p_id) });
    const wholiked = post.wholiked;
    const { rewardCount } = post;
    const existNickName = wholiked.indexOf(nickName);
    if (existNickName == -1) {
      wholiked.push(nickName);
      await Post.updateOne(
        { _id: ObjectId(p_id) },
        { wholiked: wholiked, rewardCount: rewardCount + 1 }
      );
      res.status(200).send({ message: "좋아요를 눌렀습니다." });
    } else {
      wholiked.splice(existNickName, 1);
      await Post.updateOne(
        { _id: ObjectId(p_id) },
        { wholiked: wholiked, rewardCount: rewardCount - 1 }
      );
      res.status(200).send({ message: "좋아요를 취소했습니다" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Error!" });
  }
});

export default router;
