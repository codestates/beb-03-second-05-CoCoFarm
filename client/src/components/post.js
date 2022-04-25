import * as React from "react";
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
import { styled } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CommentIcon from "@material-ui/icons/Comment";
import SendIcon from "@material-ui/icons/Send";

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

export default function Post({ item }) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="profile"
            style={{
              background: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
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
          <Comment />
          <Comment />
          <Box
            className="CommentInputArea"
            style={{ padding: "2%", display: "flex", justifyContent: "right" }}
          >
            <TextField
              id="commentLine"
              label="Comment"
              variant="standard"
              maxRows={3}
              style={{
                width: "100%",
              }}
            />
            <IconButton>
              <SendIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
