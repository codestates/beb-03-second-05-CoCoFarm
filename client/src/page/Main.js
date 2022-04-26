import Post from "../components/post";
import { useState, useEffect } from "react";
import { Container, Box } from "@material-ui/core";
function Main({ postings, isLogin, userInfo }) {
  // const list = postings.reverse();
  // const [reverse, setReverse] = useState([...list]);

  // useEffect(() => {
  //   console.log("============reverse==========", reverse);
  // }, [reverse]);

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
