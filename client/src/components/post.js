import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  TextField,
  Box,
} from "@material-ui/core";
import { pink } from "@material-ui/core/colors";
import { styled } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CommentIcon from "@material-ui/icons/Comment";
import SendIcon from "@material-ui/icons/Send";

import Comment from "../components/comment";
import axios from "axios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post({ item, isLogin, userInfo }) {
  const [expanded, setExpanded] = useState(false);
  //comment -> 댓글 목록
  const [comment, setComment] = useState(undefined);
  // isLiked-> 좋아요 눌렸는지 플래그
  const [isLiked, setIsLiked] = useState(false);
  const likeColor = isLiked ? pink[200] : "inherit";
  // 댓글 수
  const [commmentNum, setCommentNum] = useState(0);
  // 좋아요 수
  const [likeNum, setLikeNum] = useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    console.log("Current comment : ", comment);
  }, [comment]);
  useEffect(() => {
    if (item.like === true) {
      setIsLiked(true);
    }
  }, []);
  useEffect(() => {}, [likeNum]);
  // 코멘트 다는 함수
  async function makeComment() {
    if (isLogin === true) {
      // 로그인 되어있을때만 동작
      let result = await axios.post(
        "https://localhost:8080/comments",
        { p_id: item.p_id, comment: comment },
        { withCredentials: true }
      );
      window.alert(result.data.message);
    } else {
      window.alert("먼저 로그인 해주세요.");
    }
  }
  // 좋아요 버튼 눌렸을 때 동작하는 함수
  async function makeLike() {
    if (isLogin === true) {
      // 로그인 되어있을 때만 동작
      if (isLiked === false) {
        let result = await axios.post(
          "https://localhost:8080/like",
          {
            p_id: item.p_id,
          },
          { withCredentials: true }
        );
        if (result.data.message === "좋아요를 눌렀습니다.") {
          window.location.replace("/");
          window.alert(result.data.message);
        }
        console.log(likeNum);
        // window.location.replace("/");
      } else {
        setIsLiked(false);
        let result = await axios.post(
          "https://localhost:8080/like",
          {
            p_id: item.p_id,
          },
          { withCredentials: true }
        );
        window.alert(result.data.message);
        window.location.replace("/");
      }
    } else {
      window.alert("먼저 로그인 해주세요.");
    }
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="profile"
            style={{
              background: "#FF9436",
            }}
          >
            {item.nickName[0] || "U"}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="detailview"
            component={Link}
            to={`/postdetail/${item.p_id}`}
          >
            <VisibilityIcon />
          </IconButton>
        }
        title={`${item.nickName || item.author}`}
        subheader={`${item.timestamp || ""}`}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="h6" color="inherit">
          {`${item.title}`}
        </Typography>
        <Typography variant="body2" color="inherit">
          {`${item.content}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={makeLike}>
          <FavoriteIcon
            style={{
              color: likeColor,
            }}
          />
        </IconButton>
        <Typography variant="body2" color="inherit">
          {item.likeCount}
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </ExpandMore>
        <Typography variant="body2" color="inherit">
          {item.commentsCount}
        </Typography>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {item.comments &&
            item.comments.map((elem) => {
              return (
                <Box
                  style={{
                    padding: "1%",
                  }}
                >
                  <Comment item={elem} userInfo={userInfo} p_id={item.p_id} />
                </Box>
              );
            })}
          <Box
            className="CommentInputArea"
            style={{ padding: "2%", display: "flex", justifyContent: "right" }}
          >
            <TextField
              id="commentLine"
              label="Comment"
              variant="standard"
              maxRows={3}
              onChange={handleComment}
              style={{
                width: "100%",
              }}
            />
            <IconButton onClick={makeComment}>
              <SendIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
