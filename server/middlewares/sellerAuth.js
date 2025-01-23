import jwt from "jsonwebtoken";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";

export const sellerAuth = (req, res, next) => {
  try {
    // Get token
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Handle no token
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    // Decoding token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Handle no decoded
    if (!decoded) {
      return res.status(401).json({ message: "Seller not autherzied" });
    }

    // Checking role
    if (decoded.role !== "seller" && decoded.role !== "admin") {
      return res.status(404).json({ message: "User not authorized" });
    }

    // Set seller
    req.user = decoded;

    next();
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
