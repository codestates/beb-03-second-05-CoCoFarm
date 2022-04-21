import dotenv from "dotenv";

dotenv.config();

export const config = {
  db: process.env.DB_URL,
  host: process.env.HOST,
  secretKey: process.env.SECRET_KEY,
  salt: process.env.SALT_ROUNDS,
};
