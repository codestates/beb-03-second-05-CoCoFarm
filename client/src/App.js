import Header from "./components/header";
import Main from "./page/Main";
import Signin from "./page/Signin";
import Signup from "./page/Signup";
import Posting from "./page/Posting";
import Postdetail from "./page/Postdetail";
import Mypage from "./page/Mypage";
import Postedit from "./page/Postedit";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
//userInfo는 app.js에서 세팅
function App() {
  const [userInfo, setUserInfo] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [postings, setPostings] = useState(undefined);
  const cookies = new Cookies();

  useEffect(() => {
    tokenSignin();
    getPostings();
  }, []);

  useEffect(() => {
    console.log(userInfo);
    console.log(isLogin);
  }, [userInfo, isLogin]);

  const getCookie = (name) => {
    return cookies.get(name);
  };

  // 포스팅 불러오는 함수
  async function getPostings() {
    let result = await axios.get("https://localhost:8080/cocofarm", {
      withCredentials: true,
    });
    setPostings(result.data.posts);
  }

  async function tokenSignin() {
    console.log(getCookie("jwt"));
    if (getCookie("jwt")) {
      // jwt 토큰이 있으면 서버로 유저 정보 요청 보내기
      let result = await axios.get("https://localhost:8080/tokenAuth", {
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
        <Header isLogin={isLogin} handleLogout={handleLogout} />
        <Routes>
          <Route exact path="/" element={<Main postings={postings} />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/posting"
            element={<Posting isLogin={isLogin} userInfo={userInfo} />}
          ></Route>
          <Route path="/postdetail/:index" element={<Postdetail />}></Route>
          {/* <Route path="/postdetail" element={<Postdetail />}></Route> */}
          <Route path="/postedit" element={<Postedit />}></Route>
          <Route
            path="/mypage"
            element={<Mypage isLogin={isLogin} userInfo={userInfo} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
