import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import { getAuditors, saveAuditor, saveGoal, getGoalsByYear } from "./db.js"; // Adjust the import path as necessary
import config from "./config.js";
import routerAuditor from "./routes/auditorRutes.js";
import authMiddleware from "./middleware/auth.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = config.port;
app.use(authMiddleware);

app.use(routerAuditor);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
