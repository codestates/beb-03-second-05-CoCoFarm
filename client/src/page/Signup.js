import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  let navigate = useNavigate();
  const WarningMessage = "* 비밀번호는 4자리 이상이어야 합니다. *";
  const [nickname, setNickname] = useState(undefined);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [signupFlag, setSignupFlag] = useState(false);

  function nicknameHandler(e) {
    setNickname(e.target.value);
  }
  function passwordHandler(e) {
    setPassword(e.target.value);
  }
  function emailHandler(e) {
    setEmail(e.target.value);
  }
  function phoneHandler(e) {
    setPhone(e.target.value);
  }

  useEffect(() => {
    if (password.length >= 4) {
      setSignupFlag(true);
    } else {
      setSignupFlag(false);
    }
  }, [nickname, password, email, phone, signupFlag]);

  async function clickSignup() {
    try {
      // 문제 없으면 콘솔에 출력 후 리디렉션
      if (signupFlag) {
        let result = await axios.post(
          "https://localhost:8080/signup",
          {
            nickname,
            password,
            email,
            phone,
          },
          { withCredentials: true }
        );
        window.alert(result.data.message);
        // window.alert("회원가입 성공!");
        navigate("/");
      } else {
        window.alert(WarningMessage);
      }
    } catch (e) {
      window.alert(e);
    }
  }

  return (
    <div className="Signup">
      <Container
        style={{
          padding: "1%",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            borderRadius: "10px",
            backgroundColor: "white",
            width: "30%",
            height: "60%",
            padding: "1%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            style={{
              color: "darkorange",
            }}
          >
            SIGN UP
          </Typography>
          <TextField
            id="nicknameInput"
            label="NICKNAME"
            variant="standard"
            onChange={nicknameHandler}
          />
          <TextField
            id="phoneInput"
            label="PHONE"
            variant="standard"
            onChange={phoneHandler}
          />

          <TextField
            id="emailInput"
            label="E-MAIL"
            variant="standard"
            onChange={emailHandler}
          />

          <TextField
            id="passwordInput"
            label="PASSWORD"
            type="password"
            autoComplete="current-password"
            variant="standard"
            onChange={passwordHandler}
          />
          <Typography
            varaiant="body2"
            style={{
              color: "darkorange",
            }}
          >
            {signupFlag ? "" : WarningMessage}
          </Typography>

          <br />
          <Button
            variant="outlined"
            onClick={clickSignup}
            style={{
              border: "orange",
              color: "orange",
            }}
          >
            LET's GO!
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default Signup;
