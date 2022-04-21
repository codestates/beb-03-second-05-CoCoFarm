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
import axios from "axios";
import { useState } from "react";
import Post from "../components/post";

function Mypage() {
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
              <Avatar
                style={{
                  width: "5rem",
                  height: "5rem",
                  fontSize: "3rem",
                  background: "orange",
                  margin: "1rem",
                }}
              >
                U
              </Avatar>
            </Box>

            <Box
              className="ProfileTextArea"
              style={{
                display: "flex",
                margin: "1%",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4">Welcome,UserName</Typography>
              <Typography
                variant="body1"
                style={{
                  color: "gray",
                }}
              >
                your cocos : 0
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
            <Post />
            <IconButton
              style={{
                width: "3rem",
                height: "3rem",
                alignSelf: "center",
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Mypage;
