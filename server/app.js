import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import https from "https";
import fs from "fs";
import path from "path";
import { connectDB } from "./database/database.js";
import { config } from "./config.js";
import loginRouter from "./routes/login.js";
import singUpRouter from "./routes/signup.js";
import postingRouter from "./routes/posting.js";
import editRouter from "./routes/edit.js";

const __dirname = path.resolve();
const app = express();
const port = config.host || 8000;
// BODY - PARSER
app.use(express.json());
app.use(
  cors({
    credentials: true,
    //쿠키 header 넣어주려면 해줘야함.
  })
);
app.use(cookieParser());
app.use(helmet());
app.use(morgan("tiny"));

// 로그인 시 라우터
app.use("/login", loginRouter);

app.use("/signup", singUpRouter);

app.use("/posting", postingRouter);

app.use("/edit", editRouter);

// DB 연결
connectDB()
  .then(() => {
    console.log("데이터베이스 연결 완료");
    if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
      const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
      const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
      const credentials = { key: privateKey, cert: certificate };
      const server = https.createServer(credentials, app);
      server.listen(port, () => {
        console.log("https 서버 시작");
      });
    } else {
      app.listen(port, () => {
        console.log("http 서버 시작!");
      });
    }
  })
  .catch(console.log);
