import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  TextField,
  Box,
} from "@material-ui/core";
import { pink } from "@material-ui/core/colors";
import { styled } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";

export default function VotePost({
  item,
  isLogin,
  admin,
  agreeVoters,
  totalAdmin,
}) {
  const [isLiked, setIsLiked] = useState(false);
  // const [ownerCnt, setOwnerCnt] = useState(0);
  // const [voterCnt, setVoterCnt] = useState(0);
  const likeColor = isLiked || item.isVote ? pink[200] : "inherit";
  // 좋아요 버튼 눌렸을 때 동작하는 함수
  async function checkVote() {
    if (isLogin === true) {
      // 로그인 되어있을 때만 동작
      if (admin === true) {
        if (item.isVote === false) {
          let result = await axios.post(
            "https://localhost:8080/vote/agree",
            {
              p_id: item.p_id,
            },
            { withCredentials: true }
          );
          if (result.data.success === true) {
            setIsLiked(true);
            window.alert(result.data.message);
            window.location.replace("/vote");
          } else {
            window.alert(result.data.message);
          }
        } else {
          window.alert("이미 투표하셨습니다");
        }
        // 여기서 투표결과 체크
      } else {
        window.alert("관리자가 아닙니다!");
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
            {item.author[0] || "U"}
          </Avatar>
        }
        action={
          agreeVoters === totalAdmin ? (
            <Typography variant="body1">투표완료</Typography>
          ) : (
            <Typography variant="body1">{`투표인원 = ${agreeVoters} / ${totalAdmin}`}</Typography>
          )
        }
        title={item.author}
        subheader={`${item.timestamp || ""}`}
      ></CardHeader>

      <CardContent>
        <Typography variant="h6" color="inherit">
          {item.title}
        </Typography>
        <Typography variant="body2" color="inherit">
          {item.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {item.isVote ? (
          <IconButton>
            <FavoriteIcon
              style={{
                color: likeColor,
              }}
            />
          </IconButton>
        ) : (
          <IconButton aria-label="add to favorites" onClick={() => checkVote()}>
            <FavoriteIcon
              style={{
                color: likeColor,
              }}
            />
          </IconButton>
        )}

        <Typography variant="body2" color="inherit">
          {item.agreeVoters.length}
        </Typography>
      </CardActions>
    </Card>
  );
}
