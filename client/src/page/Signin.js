import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { useState, useEffect } from "react";
function Signin() {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  function emailHandler(e) {
    setEmail(e.target.value);
  }
  function passwordHandler(e) {
    setPassword(e.target.value);
  }

  useEffect(() => {
    console.log("userInfo Changed!");
  }, [email, password]);

  // TODO : onClick 함수 작성
  async function clickSignin() {
    // let result = axios.get()
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
