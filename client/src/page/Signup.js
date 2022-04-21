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
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState("");
  const [wallet, setWallet] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [signupFlag, setSignupFlag] = useState(false);

  function usernameHandler(e) {
    setUsername(e.target.value);
  }
  function passwordHandler(e) {
    setPassword(e.target.value);
  }
  function walletHandler(e) {
    setWallet(e.target.value);
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
    console.log(signupFlag);
  }, [username, password, wallet, email, phone, signupFlag]);

  async function clickSignup() {
    try {
      // 문제 없으면 콘솔에 출력 후 리디렉션
      if (signupFlag) {
        let result = await axios.post("http://localhost:8000/signup", {
          username,
          password,
          wallet,
          email,
          phone,
        });
        console.log(result);
        // window.alert(result.data.message);
        window.alert("회원가입 성공!");
        navigate("/");
      } else {
        window.alert(WarningMessage);
      }
    } catch (e) {
      window.alert(e);
    }
  } // server에 post요청

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
            id="standard-basic"
            label="USERNAME"
            variant="standard"
            onChange={usernameHandler}
          />
          <TextField
            id="standard-basic"
            label="E-MAIL"
            variant="standard"
            onChange={emailHandler}
          />

          <TextField
            id="standard-password-input"
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
          <TextField
            id="standard-basic"
            label="WALLET"
            variant="standard"
            onChange={walletHandler}
          />
          <TextField
            id="standard-basic"
            label="PHONE"
            variant="standard"
            onChange={phoneHandler}
          />

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
