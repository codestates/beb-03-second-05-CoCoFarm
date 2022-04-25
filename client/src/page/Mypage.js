import {
  Container,
  Box,
  Avatar,
  Typography,
  Divider,
  Button,
  TextField,
} from "@material-ui/core";

import axios from "axios";
import { useState, useEffect } from "react";
import Mypost from "../components/mypost";

function Mypage({ isLogin, userInfo }) {
  const WarningMessage = "* 비밀번호는 4자리 이상이어야 합니다. *";
  const [nickname, setNickname] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [myposts, setMyposts] = useState(undefined);
  const [isPosttab, setIsPosttab] = useState(true);
  const [isEdittab, setIsEdittab] = useState(false);
  const [signupFlag, setSignupFlag] = useState(false);

  function nicknameHandler(e) {
    setNickname(e.target.value);
  }
  function passwordHandler(e) {
    setPassword(e.target.value);
  }
  function emailHandler(e) {
    setEmail(e.target.value);
  }
  function phoneHandler(e) {
    setPhone(e.target.value);
  }
  function posttabHandler() {
    setIsPosttab(true);
    setIsEdittab(false);
  }
  function edittabHandler() {
    setIsPosttab(false);
    setIsEdittab(true);
  }

  useEffect(() => {
    if (password !== undefined && password.length >= 4) {
      setSignupFlag(true);
    } else {
      setSignupFlag(false);
    }
  }, [nickname, password, email, phone, signupFlag]);

  async function editMyprofile() {
    let result = await axios.post(
      `https://localhost:8080/myPage/${userInfo}`,
      { nickName: nickname, password, email, phoneNumber: phone },
      { withCredentials: true }
    );
    console.log(result.data.message);
    window.alert(result.data.message);
    window.location.replace("/mypage");
  }
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
          <Box
            className="tabs"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={posttabHandler}
              style={{
                width: "9rem",
                margin: "1rem",
                alignSelf: "center",
              }}
            >
              YOUR POSTINGS
            </Button>
            <Button
              onClick={edittabHandler}
              style={{
                width: "9rem",
                margin: "1rem",
                alignSelf: "center",
              }}
            >
              EDIT PROFILE
            </Button>
          </Box>

          <Divider variant="middle" />

          <Box
            className="MyPostingArea"
            style={{
              display: "flex",
              margin: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {/* 나의 게시물 렌더링 */}
            {isLogin === true && isPosttab === true
              ? myposts &&
                myposts.map((item) => {
                  return (
                    <Box
                      style={{
                        padding: "1%",
                        width: "100%",
                      }}
                    >
                      <Mypost item={item} userInfo={userInfo} />
                    </Box>
                  );
                })
              : null}
            {/* 프로필 에디트 탭 랜더링 */}
            {isLogin === true && isEdittab === true ? (
              <Box
                style={{
                  alignSelf: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* nickName: nickname,
            password,
            email,
            phoneNumber: phone, */}

                <TextField
                  id="nicknameInput"
                  label="NICKNAME"
                  variant="standard"
                  onChange={nicknameHandler}
                />
                <TextField
                  id="passwordInput"
                  label="PASSWORD"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  onChange={passwordHandler}
                />
                <Typography
                  varaiant="body2"
                  style={{
                    color: "darkorange",
                  }}
                >
                  {signupFlag ? "" : WarningMessage}
                </Typography>
                <TextField
                  id="emailInput"
                  label="E-MAIL"
                  variant="standard"
                  onChange={emailHandler}
                />
                <TextField
                  id="phoneInput"
                  label="PHONE"
                  variant="standard"
                  onChange={phoneHandler}
                />
                <br />
                <Button
                  variant="outlined"
                  onClick={editMyprofile}
                  style={{
                    border: "orange",
                    color: "orange",
                  }}
                >
                  Edit
                </Button>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Mypage;
