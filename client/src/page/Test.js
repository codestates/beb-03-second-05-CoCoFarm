import Post from "../components/post";
import { Container, Box } from "@material-ui/core";
function Test() {
  return (
    <div className="Main">
      <Container
        style={{
          padding: "1%",
        }}
      >
        <Box
          style={{
            padding: "1%",
          }}
        >
          <Post />
        </Box>
      </Container>
    </div>
  );
}

export default Test;
