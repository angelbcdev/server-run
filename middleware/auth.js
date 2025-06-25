import bcrypt from "bcryptjs";
import config from "../config.js";

const password = config.password;
if (!password) {
  throw new Error("PASSWORD environment variable is not set");
}

async function authMiddleware(req, res, next) {
  const clientHash = req.headers["x-api-hash"];

  if (!clientHash) {
    return res.status(401).json({ error: "Missing hash" });
  }

  const validPassword = await bcrypt.compare(password, clientHash);
  if (!validPassword) {
    return res.status(401).json({ error: "Invalid password" });
  }

  next();
}

export default authMiddleware;
