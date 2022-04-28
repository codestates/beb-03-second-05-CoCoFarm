import { Button } from "@material-ui/core";

import { useState, useEffect } from "react";
import axios from "axios";
import VotePost from "../components/votePost";

const Vote = ({ isLogin }) => {
  const [admin, setAdmin] = useState(false);
  const [contents, setContents] = useState([]);

  async function getVotePostings() {
    let data = await axios.get("https://localhost:8080/vote", {
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
            >
              <VotePost admin={admin} item={content} isLogin={isLogin} />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Vote;
// jwt 인증

//votePost(배열)
// author
// title
// content
// agreeVoters

// ***글쓰기***
//1. 글쓰기를 누르면 관리자인지 조회
//2. post요청으로 안건 작성(클라이언트에서)
//3.

// 글쓰기 -> 관리자만 가능
//투표 버튼 을 눌릴수있는것도 관리자만 가능
