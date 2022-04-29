import {
  Container,
  Box,
  Avatar,
  Typography,
  IconButton,
  Divider,
  TextField,
} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import SendIcon from "@material-ui/icons/Send";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Comment from "../components/comment";
import { pink } from "@material-ui/core/colors";

import axios from "axios";

function Postdetail({ userInfo, isLogin }) {
  const location = useLocation();
  const path = location.pathname.split("/");

  const p_id = path[path.length - 1];
  const [curPost, setCurPost] = useState(null);
  const [comment, setComment] = useState(undefined);
  const [isLiked, setIsLiked] = useState(false);
  const likeColor = isLiked ? pink[200] : "inherit";

  async function getOnePost(postId) {
    let result = await axios.get(
      `https://cocofarm.herokuapp.com/posts?p_id=${postId}`,
      {
        withCredentials: true,
      }
    );
    console.log("curPost : ", result.data);
    return result.data;
  }
  useEffect(() => {
    getOnePost(p_id).then(setCurPost);
  }, []);

  useEffect(() => {
    console.log(curPost);
    if (curPost && curPost.post.like === true) {
      setIsLiked(true);
    }
  }, [curPost]);
  useEffect(() => {
    console.log("Current comment : ", comment);
  }, [comment]);
  const handleComment = (e) => {
    setComment(e.target.value);
  };
  // 코멘트 다는 함수
  async function makeComment() {
    if (isLogin === true) {
      // 로그인 되어있을때만 동작
      let result = await axios.post(
        "https://cocofarm.herokuapp.com/comments",
        { p_id: p_id, comment: comment },
        { withCredentials: true }
      );
      window.alert(result.data.message);
      window.location.replace(`/postdetail/${p_id}`);
    } else {
      window.alert("먼저 로그인 해주세요.");
    }
  }
  async function makeLike() {
    if (isLogin === true) {
      // 로그인 되어있을 때만 동작
      if (isLiked === false && curPost.post.like === false) {
        setIsLiked(true);
        let result = await axios.post(
          "https://cocofarm.herokuapp.com/like",
          {
            p_id: p_id,
          },
          { withCredentials: true }
        );

        window.alert(result.data.message);
        window.location.replace(`/postdetail/${p_id}`);
      } else {
        setIsLiked(false);
        let result = await axios.post(
          "https://cocofarm.herokuapp.com/like",
          {
            p_id: p_id,
          },
          { withCredentials: true }
        );
        window.alert(result.data.message);
        window.location.replace(`/postdetail/${p_id}`);
      }
    } else {
      window.alert("먼저 로그인 해주세요.");
    }
  }
  return (
    <div className="Postdetail">
      <Container
        style={{
          width: "60%",
          padding: "1%",
          display: "flex",
        }}
      >
        {/* 흰 배경 박스 */}
        <Box
          style={{
            marginTop: "5%",
            borderRadius: "10px",
            backgroundColor: "white",
            width: "100%",
            padding: "1%",
          }}
        >
          <Box
            className="UserInfo"
            style={{
              display: "flex",
              padding: "1%",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{
                backgroundColor: "orange",
                margin: "1%",
              }}
            >
              U
            </Avatar>
            <Box className="NameAndDate">
              <Typography variant="h5">
                {curPost ? curPost.post.author : ""}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  color: "gray",
                }}
              >
                {curPost ? curPost.post.timestamp : ""}
              </Typography>
            </Box>
          </Box>
          <Box className="ContentArea">
            <Box
              className="Title"
              style={{
                marginLeft: "5%",
                marginRight: "5%",
              }}
            >
              <Typography variant="h5">
                {curPost ? curPost.post.title : ""}
              </Typography>
              <Typography variant="body1">
                {curPost ? curPost.post.content : ""}
              </Typography>
            </Box>
          </Box>
          <Box
            className="IconArea"
            style={{
              display: "flex",
              justifyContent: "right",
            }}
          >
            <Box
              className="CommentIconArea"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton onClick={makeLike}>
                <FavoriteIcon
                  style={{
                    color: likeColor,
                  }}
                />
              </IconButton>
              <Typography variant="body2" color="inherit">
                {curPost ? curPost.post.likeCount : null}
              </Typography>
              <IconButton>
                <CommentIcon />
              </IconButton>
              <Typography variant="body2" color="inherit">
                {curPost ? curPost.post.commentsCount : null}
              </Typography>
            </Box>
          </Box>
          <Divider variant="middle" />
          <Box
            className="CommentArea"
            style={{
              margin: "1%",
              borderRadius: "5px",
            }}
          >
            {curPost &&
              curPost.post.comments.map((elem) => {
                return (
                  <Box
                    style={{
                      padding: "1%",
                    }}
                  >
                    <Comment item={elem} userInfo={userInfo} p_id={p_id} />
                  </Box>
                );
              })}
          </Box>
          <Box
            className="CommentInputArea"
            style={{ padding: "2%", display: "flex", justifyContent: "right" }}
          >
            <TextField
              id="outlined-basic"
              label="Comment"
              variant="standard"
              onChange={handleComment}
              maxRows={3}
              style={{
                width: "100%",
              }}
            />
            <IconButton onClick={makeComment}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Postdetail;
