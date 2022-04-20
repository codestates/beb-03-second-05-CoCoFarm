import { Box, Typography, Avatar } from "@material-ui/core";
function Comment() {
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
          G
        </Avatar>
        <Typography variant="body1">Guest1</Typography>
      </Box>
      <Box
        className="Commentcontent"
        style={{
          marginLeft: "5%",
        }}
      >
        초밥이요!
      </Box>
    </Box>
  );
}

export default Comment;
