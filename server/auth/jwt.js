import jwt from "jsonwebtoken";
import { config } from "../config.js";
export const createToken = (payload) => {
  const { username, wallet, email } = payload;
  const data = {
    username,
    wallet,
    email,
  };
  const token = jwt.sign(data, config.secretKey, {
    expiresIn: "7d",
  });
  return token;
};
