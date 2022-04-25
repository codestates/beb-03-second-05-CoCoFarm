import { Box, Typography, Avatar, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
function Comment({ item, userInfo, p_id }) {
  // 댓글 삭제 함수
  async function DeleteComment() {
    console.log("c_id :", item._id);
    console.log("p_id :", p_id);
    let result = await axios.delete(
      "https://localhost:8080/comments",
      {
        c_id: item._id,
        p_id: p_id,
      },
      {
        withCredential: true,
      }
    );
    window.alert(result.data.message);
    window.location.replace("/");
  }
  return (
    <Box
      className="Comment"
      style={{
        padding: "1%",
        backgroundColor: "#EAEAEA",
        margin: "0.5%",
        borderRadius: "10px",
      }}
    >
      <Box
        className="Userinfo"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          style={{
            margin: "1%",
            width: "2rem",
            height: "2rem",
          }}
        >
          {item.author[0] || "U"}
        </Avatar>
        <Typography variant="body1">{item.author}</Typography>
        {item.author === userInfo ? (
          <IconButton size="small" onClick={DeleteComment}>
            <DeleteIcon
              style={{
                fontSize: "1.2rem",
              }}
            />
          </IconButton>
        ) : null}
      </Box>
      <Box
        className="Commentcontent"
        style={{
          marginLeft: "5%",
        }}
      >
        {item.comment}
      </Box>
    </Box>
  );
}

export default Comment;
