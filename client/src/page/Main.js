import Post from "../components/post";
import { Container, Box } from "@material-ui/core";
function Main({ postings, isLogin, userInfo }) {
  let LoginInfo = isLogin;
  return (
    <div className="Main">
      <Container
        style={{
          padding: "1%",
        }}
      >
        {postings &&
          postings.map((item) => {
            return (
              <Box
                style={{
                  padding: "1%",
                }}
              >
                <Post item={item} isLogin={LoginInfo} userInfo={userInfo} />
              </Box>
            );
          })}
      </Container>
    </div>
  );
}

export default Main;
