import bcrypt from "bcrypt";
import { config } from "../config.js";
export const ChangePassword = async (password) => {
  // const salt = config.salt;
  // const hashPassword = await bcrypt.hash(password, salt);
  const hashPassword = bcrypt.hashSync(password, config.salt);
  return hashPassword;
};

export const comparePassword = (password, hashPassword) => {
  const result = bcrypt.compare(password, hashPassword);
};
