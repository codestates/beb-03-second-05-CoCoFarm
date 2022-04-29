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
import tokenAuthRouter from "./routes/tokenAuth.js";
import mainPageRouter from "./routes/main.js";

import myPageRouter from "./routes/myPage.js";

import postDetail from "./routes/postDetail.js";
import commentsRouter from "./routes/comments.js";
import likeRouter from "./routes/like.js";
import supprotTokenRouter from "./routes/supportToken.js";
import voteRouter from "./routes/vote.js";
import reward from "./contract/reward.js";
import tokenUpdate from "./contract/tokenUpdate.js";

// import 로 쓰면 __dirname 따로 못씀. 그래서 써줘야함
const __dirname = path.resolve();
const app = express();
const port = config.port || 8000;
// BODY - PARSER
app.set("trust proxy", 1);
app.use(express.json());
app.use(
  cors({
    origin: ["https://localhost:3000"],

    credentials: true,
    //쿠키 header 넣어주려면 필요
  })
);
app.use(cookieParser());
app.use(helmet());
app.use(morgan("tiny"));

// 보상함수 (10분마다 보상해줌.)
setInterval(reward, 60000);

//토큰 데이터베이스 업데이트(10분마다 보상해줌.)
setInterval(tokenUpdate, 60000);

// 메인 라우터
app.use("/cocofarm", mainPageRouter);
// 인증 라우터
app.use("/tokenAuth", tokenAuthRouter);
app.use("/login", loginRouter);
app.use("/signup", singUpRouter);

// 개인정보 확인 및 수정
app.use("/myPage", myPageRouter);

// 게시물 관련 라우터
app.use("/posting", postingRouter);
app.use("/edit", editRouter);
app.use("/posts", postDetail);
app.use("/comments", commentsRouter);
app.use("/like", likeRouter);

// 토큰 후원
app.use("/supportToken", supprotTokenRouter);

// 투표
app.use("/vote", voteRouter);

// 에러처리
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

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
        console.log(`${port}https 서버 시작`);
      });
    } else {
      app.listen(port, () => {
        console.log(`${port}http 서버 시작!`);
      });
    }
  })
  .catch(console.log);
