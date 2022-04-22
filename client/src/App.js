import Header from "./components/header";
import Main from "./page/Main";
import Signin from "./page/Signin";
import Signup from "./page/Signup";
import Posting from "./page/Posting";
import Postdetail from "./page/Postdetail";
import Mypage from "./page/Mypage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
//userInfo는 app.js에서 세팅
function App() {
  const [userInfo, setUserInfo] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    tokenSignin();
  }, []);

  useEffect(() => {
    console.log(userInfo);
    console.log(isLogin);
  }, [userInfo, isLogin]);

  const getCookie = (name) => {
    return cookies.get(name);
  };
  async function tokenSignin() {
    console.log(getCookie("jwt"));
    // if (getCookie("jwt")) {
    //   // jwt 토큰이 있으면 서버로 유저 정보 요청 보내기
    //   if(요청 === 성공){
    //     setUserInfo()
    //     setIsLogin()
    //   }
    // }
  }
  function userinfoSetting(userid) {
    setUserInfo(userid);
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
          <Route exact path="/" element={<Main />}></Route>
          <Route
            path="/signin"
            element={<Signin userinfoSetting={userinfoSetting} />}
          ></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/posting"
            element={<Posting isLogin={isLogin} userInfo={userInfo} />}
          ></Route>
          {/* <Route path="/postdetail/:index" element={<Postdetail />}></Route> */}
          <Route path="/postdetail" element={<Postdetail />}></Route>

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
