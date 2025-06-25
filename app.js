import express from "express";
import { config } from "../server/config.js";

import cors from "cors";
// Adjust the import path as necessary
import authMiddleware from "./middleware/auth.js";
import routerAuditor from "./routes/auditorRutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);
const PORT = config.port || 3000;

// Routes
app.use(routerAuditor);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
