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
function Signin({ userinfoSetting }) {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const navigate = useNavigate();

  function emailHandler(e) {
    setEmail(e.target.value);
  }
  function passwordHandler(e) {
    setPassword(e.target.value);
  }

  useEffect(() => {
    // console.log("userInfo Changed!");
  }, [email, password]);

  // TODO : onClick 함수 작성
  async function clickSignin() {
    try {
      let result = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });

      console.log(result);
      userinfoSetting(email);
      window.alert(result.data);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="Signin">
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
            height: "40%",
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
            SIGN IN
          </Typography>
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
          <br />
          <Button
            variant="outlined"
            onClick={clickSignin}
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

export default Signin;
