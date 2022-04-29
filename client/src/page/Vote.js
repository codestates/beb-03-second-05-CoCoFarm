import { Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import axios from "axios";
import VotePost from "../components/votePost";

const Vote = ({ isLogin }) => {
  const [admin, setAdmin] = useState(false);
  const [contents, setContents] = useState([]);
  const [totalAdmin, setTotalAdmin] = useState(0);
  async function getVotePostings() {
    let data = await axios.get("https://cocofarm.herokuapp.com/vote", {
      withCredentials: true,
    });
    console.log(`data = ${data}`);
    return data.data;
  }

  useEffect(() => {
    getVotePostings().then((data) => {
      console.log(data);
      setAdmin(data.admin);
      setContents(data.votePost);
      setTotalAdmin(data.totalAdmin);
    });
  }, []);
  function movePost() {
    window.location.replace("/vote/posting");
  }
  return (
    <div className="Vote">
      <Button onClick={movePost}>{"안건 올리기"}</Button>
      <ul>
        {contents.map((content, index) => {
          return (
            <div
              style={{
                width: "80vh",
                margin: "0 auto",
              }}
              key={index}
            >
              <VotePost
                admin={admin}
                item={content}
                isLogin={isLogin}
                agreeVoters={content.agreeVoters.length}
                totalAdmin={totalAdmin}
              />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Vote;
