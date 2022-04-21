import bcrypt from "bcrypt";
import { config } from "../config.js";
export const ChangePassword = async (password) => {
  // const salt = config.salt;
  // const hashPassword = await bcrypt.hash(password, salt);
  const hashPassword = await bcrypt.hash(password, config.salt);
  return hashPassword;
};

export const comparePassword = (password, dbPassword) => {
  const result = bcrypt.compare(password, dbPassword);
  return result;
};
