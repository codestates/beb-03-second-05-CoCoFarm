import Header from "./components/header";
import Main from "./page/Main";
import Signin from "./page/Signin";
import Signup from "./page/Signup";
import Posting from "./page/Posting";
import Postdetail from "./page/Postdetail";
import Mypage from "./page/Mypage";
import Postedit from "./page/Postedit";
import Vote from "./page/Vote";
import VotePosting from "./page/VotePosting";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
//userInfo는 app.js에서 세팅

function App() {
  const [userInfo, setUserInfo] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [postings, setPostings] = useState(undefined);
  const [cookie, setCookie] = useState(undefined);
  const cookies = new Cookies();

  useEffect(() => {
    tokenSignin();
    getPostings();
  }, []);

  useEffect(() => {
    // console.log("userNickname : ", userInfo);
    // console.log("isLogin? : ", isLogin);
  }, [userInfo, isLogin]);

  useEffect(() => {
    // console.log("current postings : ", postings);
  }, [postings]);

  const getCookie = (name) => {
    setCookie(cookies.get(name));
    return cookies.get(name);
  };

  // 포스팅 불러오는 함수
  async function getPostings(item) {
    let result = await axios.get("https://cocofarm.herokuapp.com/cocofarm", {
      withCredentials: true,
    });
    // 검색어가 존재한다면 필터링해서 보여주기
    if (item) {
      console.log(item);
      let posts = result.data.posts.reverse();
      posts = posts.filter((elem) => {
        if (
          elem.nickName.includes(item) ||
          elem.title.includes(item) ||
          elem.content.includes(item)
        ) {
          return true;
        } else {
          return false;
        }
      });
      console.log("filtering : ", posts);
      setPostings([...posts]);
    } else {
      setPostings(result.data.posts.reverse());
    }
  }

  async function tokenSignin() {
    console.log(getCookie("jwt"));
    if (getCookie("jwt")) {
      // jwt 토큰이 있으면 서버로 유저 정보 요청 보내기
      let result = await axios.get("https://cocofarm.herokuapp.com/tokenAuth", {
        withCredentials: true,
      });
      if (result.data.nickName) {
        userinfoSetting(result.data.nickName);
        // console.log(result.data.nickName);
      }
    }
  }
  function userinfoSetting(userNickname) {
    setUserInfo(userNickname);
    setIsLogin(true);
  }
  function handleLogout() {
    setUserInfo("");
    setIsLogin(false);
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Header
          isLogin={isLogin}
          handleLogout={handleLogout}
          getPostings={getPostings}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Main postings={postings} isLogin={isLogin} userInfo={userInfo} />
            }
          ></Route>
          <Route
            path="/signin"
            element={<Signin userinfoSetting={userinfoSetting} />}
          ></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/posting"
            element={<Posting isLogin={isLogin} userInfo={userInfo} />}
          ></Route>
          <Route
            path="/postdetail/:index"
            element={<Postdetail userInfo={userInfo} isLogin={isLogin} />}
          ></Route>
          <Route
            path="/postedit/:index"
            element={<Postedit userInfo={userInfo} />}
          ></Route>
          <Route
            path="/mypage"
            element={<Mypage isLogin={isLogin} userInfo={userInfo} />}
          ></Route>
          <Route path="/vote" element={<Vote isLogin={isLogin} />}></Route>

          <Route
            path="/vote/posting"
            element={<VotePosting isLogin={isLogin} userInfo={userInfo} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
