import bcrypt from "bcrypt";
import { config } from "../config.js";
export const hashedPassword = async (password) => {
  const hashPassword = bcrypt.hash(password, Number(config.salt));
  return hashPassword;
};

export const comparePassword = (password, dbPassword) => {
  const result = bcrypt.compare(password, dbPassword);
  return result;
};
