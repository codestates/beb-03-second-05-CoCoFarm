import bcrypt from "bcrypt";
import { config } from "../config.js";
export const hashedPassword = async (password) => {
  const hashPassword = await bcrypt.hash(password, Number(config.salt));
  return hashPassword;
};

export const comparePassword = async (password, dbPassword) => {
  const result = await bcrypt.compare(password, dbPassword);
  return result;
  //bool
};
