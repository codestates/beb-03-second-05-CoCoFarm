import Header from "./components/header";
import Main from "./page/Main";
import Signin from "./page/Signin";
import Signup from "./page/Signup";
import Posting from "./page/Posting";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Main />}></Route>
          <Route exact path="/signin" element={<Signin />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/posting" element={<Posting />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
