import express from "express";
import { ObjectId } from "mongodb";
import { decodingToken } from "../auth/decodingToken.js";
import Post from "../model/post.js";

const router = express.Router();

router.get("/", async (req, res) => {
  // p_id, nickName, title, content, timestamp, commentsCount, likeCount, like

  // 로그인 여부에 따라 like 포함 달라짐

  const data = decodingToken(req.cookies.jwt);

  // 모든 게시물 다 가져오기
  // p_id, nickName, title, content 는 그대로 사용
  // commentsCount, likeCount 세기
  // 좋아요 여부 확인하기

  try {
    const allPosts = await Post.find(); // 배열로 post 다 불러옴

    const setData = allPosts.map((post) => {
      return {
        p_id: post.id,
        nickName: post.author,
        title: post.title,
        content: post.content,
        comments: post.comments,
        timestamp: ObjectId(post.id).getTimestamp(),
        commentsCount: post.comments.length,
        likeCount: post.wholiked.length,
        like: post.wholiked.includes(data.nickName),
      };
    });

    res.status(200).send({ posts: setData });
  } catch (err) {
    res.status(400).send({ message: "게시물을 불러오는데 실패했습니다." });
  }
});

export default router;
