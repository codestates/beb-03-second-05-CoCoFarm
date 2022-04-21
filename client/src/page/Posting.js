import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { useState } from "react";

function Posting() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [hasgtag,setHashtag] = useState("");
  // optional

  // TODO : onChange, onClick 함수 작성
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
              U
            </Avatar>
            <Typography variant="h5">UserName</Typography>
          </Box>

          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            multiline
            row={2}
            maxRows={2}
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
              rows={15}
              maxRows={15}
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

export default Posting;
