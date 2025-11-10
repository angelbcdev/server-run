import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, ".env") });

//{ AUDITOR: "auditor_production", GOAL: "goal2" }

const isDev = process.env.MODE === "dev";

const config = {
  port: process.env.PORT,
  mongo_url: process.env.MONGO_URL,
  password: process.env.PASSWORD,
  db: isDev ? "warehouse_dev" : "warehouse",
  collection: {
    AUDITOR: isDev ? "auditor_dev" : "auditor_production",
    GOAL: isDev ? "goal_dev" : "goal_production",
  },
};

export default config;

/**
 *  REMEMBER server has other git to update any change
 */
