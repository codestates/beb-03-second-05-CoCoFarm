import {
  Container,
  Box,
  Avatar,
  Typography,
  Divider,
  Chip,
} from "@material-ui/core";

import axios from "axios";
import { useState, useEffect } from "react";
import Mypost from "../components/mypost";

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
    console.log("my postings : ", myposts);
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
            flexWrap: "wrap",
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
                  {userInfo[0] || "U"}
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
              flexWrap: "wrap",
            }}
          >
            {/* 나의 게시물 렌더링 */}
            {isLogin
              ? myposts &&
                myposts.map((item) => {
                  return (
                    <Box
                      style={{
                        padding: "1%",
                        width: "100%",
                      }}
                    >
                      <Mypost item={item} />
                    </Box>
                  );
                })
              : null}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Mypage;
