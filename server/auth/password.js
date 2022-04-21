import bcrypt from "bcrypt";
import { config } from "../config.js";
export const ChangePassword = (password) => {
  const salt = config.salt;
  const hashPassword = bcrypt.hash(password, salt);

  return hashPassword;
};
