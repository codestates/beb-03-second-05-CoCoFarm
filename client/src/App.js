import Header from "./components/header";
import Main from "./page/Main";
import Signin from "./page/Signin";
import Signup from "./page/Signup";
import Posting from "./page/Posting";
import Postdetail from "./page/Postdetail";
import Mypage from "./page/Mypage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
//userInfo는 app.js에서 세팅
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Main />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/posting" element={<Posting />}></Route>
          <Route path="/postdetail" element={<Postdetail />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
