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
import axios from "axios";
import { styled } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CommentIcon from "@material-ui/icons/Comment";
import SendIcon from "@material-ui/icons/Send";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import Comment from "../components/comment";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Mypost({ item, userInfo }) {
  console.log(item);
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState(undefined);

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    console.log("Current comment : ", comment);
  }, [comment]);
  // 코멘트 다는 함수
  async function makeComment() {
    let result = await axios.post(
      "https://localhost:8080/comments",
      { p_id: item.p_id, comment: comment },
      { withCredentials: true }
    );
    window.alert(result.data.message);
    window.location.replace("/");
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Box
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      <Card style={{ width: "90%" }}>
        <CardHeader
          avatar={<Avatar aria-label="profile">{item.author[0] || "U"}</Avatar>}
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
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentIcon />
          </ExpandMore>
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
                    <Comment item={elem} userInfo={userInfo} p_id={elem.p_id} />
                  </Box>
                );
              })}
          </CardContent>
        </Collapse>
      </Card>
      <Box
        className="IconArea"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <IconButton
          component={Link}
          to={`/postedit/${item._id}`}
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
  );
}
