import jwt from "jsonwebtoken";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";

export const userAuth = async (req, res, next) => {
  try {
    // Get token

    const { token } = req.cookies;

    // Handle no token
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    // Decoding token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Handle no decoded
    if (!decoded) {
      return res.status(401).json({ message: "User not autherized" });
    }

    // Set user
    req.user = decoded;

    next();
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
