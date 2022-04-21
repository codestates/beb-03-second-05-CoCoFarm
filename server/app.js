import express from "express";

import { connectDB } from "./database/database.js";
import userModel from "./model/users.js";
const app = express();
const port = 8080;

app.use(express.json());

app.use("/signup", async (req, res) => {
  console.log(req.body);
  const { name, password, email, phoneNumber, wallet } = req.body;
  const userSchema = {
    name,
    password,
    email,
    phoneNumber,
    wallet,
  };
  const user = await new userModel(userSchema).save(function (err) {
    if (err) console.log(err);
  });
  res.send(user);
});

connectDB()
  .then(() => {
    console.log("데이터베이스 연결 완료");
    app.listen(port, () => {
      console.log(`${port} 서버 시작`);
    });
  })
  .catch(console.log);
