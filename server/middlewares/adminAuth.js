import jwt from "jsonwebtoken";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";
import { Seller } from "../models/sellerModel.js";

export const adminAuth = async (req, res, next) => {
  try {
    // Get token
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    // Decoding token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Admin not autherzied" });
    }

    // Checking role
    if (decoded.role !== "seller" && decoded.role !== "admin") {
      return res.status(404).json({ error: "User not autherzied" });
    }

    // Check role on database
    const admin = await Seller.findById(decoded.id);
    if (admin.role === "admin") {
      // Set admin
      req.admin = decoded;
      next();
    }
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};
