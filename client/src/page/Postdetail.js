import {
  Container,
  Box,
  Avatar,
  Typography,
  IconButton,
  Divider,
  TextField,
  Button,
} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
import SendIcon from "@material-ui/icons/Send";
import FavoriteIcon from "@material-ui/icons/Favorite";

import Comment from "../components/comment";

function Postdetail() {
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
              <Typography variant="h5">Username</Typography>
              <Typography
                variant="body2"
                style={{
                  color: "gray",
                }}
              >
                September 14, 2016
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
              <Typography variant="h5">Title</Typography>
              <Typography variant="body1">
                저는 오늘 점심으로 라면 먹었어요. 저녁은 뭐 먹을까요?
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
            <Box className="CommentIconArea">
              <IconButton>
                <FavoriteIcon />
              </IconButton>
              <IconButton>
                <CommentIcon />
              </IconButton>
              <IconButton>
                <ShareIcon />
              </IconButton>
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
            <Comment />
            <Comment />
          </Box>
          <Box
            className="CommentInputArea"
            style={{ padding: "2%", display: "flex", justifyContent: "right" }}
          >
            <TextField
              id="outlined-basic"
              label="Comment"
              variant="outlined"
              maxRows={3}
              style={{
                width: "100%",
              }}
            />
            <IconButton>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Postdetail;
