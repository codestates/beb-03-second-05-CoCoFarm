import bcrypt from "bcrypt";
import { config } from "../config.js";
export const ChangePassword = async (password) => {
  // const salt = config.salt;
  // const hashPassword = await bcrypt.hash(password, salt);
  const hashePassword = bcrypt.hashSync(password, 10);
  return hashPassword;
};

export const comparePassword = (password) => {
  const result = bcrypt.compare();
};
