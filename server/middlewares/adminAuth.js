import jwt from "jsonwebtoken";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";

// Handle admin authentication
export const adminAuth = async (req, res, next) => {
  try {
    // Get token

    const { token } = req.cookies;

    // Handle token not found
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    // Decoding token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Handle no decoded
    if (!decoded) {
      return res.status(401).json({ message: "Admin not authorized" });
    }

    // Checking role
    if (decoded.role !== "admin") {
      return res.status(404).json({ message: "User not authorized" });
    }

    // Set admin
    req.user = decoded;
    next();
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
