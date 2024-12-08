import jwt from "jsonwebtoken";

export const sellerAuth = (req, res, next) => {
  try {
    // Get token
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    // Decoding token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Seller not autherzied" });
    }

    // Checking role
    if (decoded.role !== "seller" && decoded.role !== "admin") {
      return res.status(404).json({ error: "User not autherzied" });
    }

    // Set seller
    req.seller = decoded;
    next();
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};
