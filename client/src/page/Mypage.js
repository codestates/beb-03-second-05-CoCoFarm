import {
  Container,
  Box,
  Avatar,
  Typography,
  Divider,
  Chip,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { useState, useEffect } from "react";
import Post from "../components/post";

function Mypage({ isLogin, userInfo }) {
  const [myposts, setMyposts] = useState(undefined);

  async function getMypost() {
    let result = await axios.get("https://localhost:8080/myPage", {
      withCredentials: true,
    });
    return result.data.posts;
  }
  useEffect(() => {
    getMypost().then(setMyposts);
  }, []);
  useEffect(() => {
    console.log(myposts);
  }, [myposts]);
  return (
    <div className="Mypage">
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1%",
        }}
      >
        <Box
          className="MypageContent"
          style={{
            borderRadius: "10px",
            width: "80%",
            background: "white",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            className="ProfileTitle"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box>
              {isLogin ? (
                <Avatar
                  style={{
                    width: "5rem",
                    height: "5rem",
                    fontSize: "3rem",
                    background: "orange",
                    margin: "1rem",
                  }}
                >
                  {userInfo[0]}
                </Avatar>
              ) : null}
            </Box>

            <Box
              className="ProfileTextArea"
              style={{
                display: "flex",
                margin: "1%",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4">
                {isLogin ? `${userInfo}` : "Please Sign-in First"}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: "gray",
                }}
              >
                {isLogin ? "your cocos : 0" : null}
              </Typography>
            </Box>
          </Box>
          <Chip
            label="YOUR POSTINGS"
            style={{
              width: "9rem",
              margin: "1rem",
              alignSelf: "center",
            }}
          />

          <Divider variant="middle" />

          <Box
            className="MyPostingArea"
            style={{
              display: "flex",
              margin: "1rem",
            }}
          >
            {/* 나의 게시물 렌더링 */}
            {isLogin ? null : null}
            <IconButton
              style={{
                width: "3rem",
                height: "3rem",
                alignSelf: "center",
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              style={{
                width: "3rem",
                height: "3rem",
                alignSelf: "center",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Mypage;
