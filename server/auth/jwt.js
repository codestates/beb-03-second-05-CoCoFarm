import jwt from "jsonwebtoken";
import { config } from "../config.js";
export const createToken = (payload) => {
  const { nickName, email } = payload;
  const data = {
    nickName,
    email,
  };
  const token = jwt.sign(data, config.secretKey, {
    expiresIn: "7d",
  });
  return token;
};
