import bcrypt from "bcrypt";
import { config } from "../config.js";
export const hashedPassword = (password) => {
  const hashPassword = bcrypt.hashSync(password, Number(config.salt));
  return hashPassword;
};

export const comparePassword = (password, dbPassword) => {
  const result = bcrypt.compare(password, dbPassword);
  return result;
};
