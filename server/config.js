import dotenv from "dotenv";

dotenv.config();

export const config = {
  db: process.env.DB_URL,
  host: process.env.HOST,
  secretKey: process.env.SECRET_KEY,
  salt: process.env.SALT_ROUNDS,
  seed_salt: process.env.SEED_SALT,
  CA: process.env.CA,
  NFT: process.env.NFTCA,
  ServerPriveKey: process.env.SERVERPRIVKEY,
  InfuraProjectId: process.env.InfuraId,
  InfuraProjectSecret: process.env.InfuraPassword,
};
