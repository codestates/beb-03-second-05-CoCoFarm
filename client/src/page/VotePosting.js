import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function VotePosting({ userInfo, isLogin }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [hasgtag,setHashtag] = useState("");
  // optional
  const cookies = new Cookies();
  const navigate = useNavigate();

  const getCookie = (name) => {
    return cookies.get(name);
  };

  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handleContent(e) {
    setContent(e.target.value);
  }

  useEffect(() => {
    console.log("userInfo Changed!");
  }, [title, content]);

  //  클릭함수 로그인된거 처리하기
  async function clickPosting() {
    let result = await axios.post(
      "https://localhost:8080/vote/posting",
      {
        title,
        content,
      },

      { withCredentials: true }
    );
    window.alert(result.data.message);
    window.location.replace("/vote");
  }
  return (
    <div className="Posting">
      <Container
        style={{
          padding: "1%",
          display: "flex",
          height: "90vh",
          alignItems: "center",
        }}
      >
        {/* 흰 배경 박스 */}
        <Box
          style={{
            background: "white",
            borderRadius: "5px",
            width: "100%",
            height: "80%",
            padding: "1%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            className="header"
            style={{
              display: "flex",
              padding: "1%",
              height: "10%",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{
                backgroundColor: "orange",
                margin: "1%",
              }}
            >
              {isLogin ? userInfo[0] : "U"}
            </Avatar>
            <Typography variant="h5">
              {isLogin ? `${userInfo}` : "Undefined"}
            </Typography>
          </Box>

          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            multiline
            minrow={2}
            maxRows={2}
            onChange={handleTitle}
            style={{
              width: "98%",
              left: "1%",
            }}
          />

          <br />
          <Box
            className="inputArea"
            style={{
              background: "#EAEAEA",
              height: "50%",
              display: "flex",
              borderRadius: "10px",
            }}
          >
            <TextField
              id="outlined-multiline-static"
              label="Write a Post"
              multiline
              minRows={15}
              maxRows={15}
              onChange={handleContent}
              style={{
                width: "100%",
                margin: "1%",
              }}
            />
          </Box>
          <Box
            className="header"
            style={{
              display: "flex",
              padding: "1%",
              height: "10%",
              alignItems: "center",
              justifyContent: "right",
            }}
          >
            <Button
              variant="contained"
              onClick={clickPosting}
              style={{
                backgroundColor: "darkorange",
                color: "white",
              }}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default VotePosting;
