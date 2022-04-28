import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const decodingToken = (token) => {
  const data = jwt.verify(token, config.secretKey, (error, decoded) => {
    if (error) {
      console.log(error);
      return null;
    } else {
      return decoded;
    }
  });

  return data;
};
