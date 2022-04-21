import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import { connectDB } from "./database/database.js";
import { config } from "./config.js";
import loginRouter from "./routes/login.js";
import singUpRouter from "./routes/signup.js";
import postingRouter from "./routes/posting.js";
import editRouter from "./routes/edit.js";

const app = express();
const port = config.host || 8000;
// BODY - PARSER
app.use(express.json());
app.use(
  cors({
    credentials: true,
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
    app.listen(port, () => {
      console.log(`${port} 서버 시작`);
    });
  })
  .catch(console.log);
