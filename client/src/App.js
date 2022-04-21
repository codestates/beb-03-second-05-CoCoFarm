import Header from "./components/header";
import Main from "./page/Main";
import Signin from "./page/Signin";
import Signup from "./page/Signup";
import Posting from "./page/Posting";
import Postdetail from "./page/Postdetail";
import Mypage from "./page/Mypage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
//userInfo는 app.js에서 세팅
function App() {
  const [userInfo, setUserInfo] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    console.log(userInfo);
    console.log(isLogin);
  }, [userInfo, isLogin]);
  function userinfoSetting(userid) {
    setUserInfo(userid);
    setIsLogin(true);
  }
  function handleLogout() {
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
          <Route path="/posting" element={<Posting />}></Route>
          <Route path="/postdetail" element={<Postdetail />}></Route>
          <Route path="/mypage" element={<Mypage isLogin={isLogin} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
