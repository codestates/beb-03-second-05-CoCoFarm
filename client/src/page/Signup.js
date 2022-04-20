import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
function Signup() {
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
          <TextField id="standard-basic" label="USERNAME" variant="standard" />
          <TextField id="standard-basic" label="ID" variant="standard" />

          <TextField
            id="standard-password-input"
            label="PASSWORD"
            type="password"
            autoComplete="current-password"
            variant="standard"
          />
          <TextField id="standard-basic" label="WALLET" variant="standard" />
          <TextField id="standard-basic" label="PHONE" variant="standard" />

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

export default Signup;
