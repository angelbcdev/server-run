import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, ".env") });

export const config = {
  port: process.env.PORT,
  mongo_url: process.env.MONGO_URL,
  password: process.env.PASSWORD,
};
