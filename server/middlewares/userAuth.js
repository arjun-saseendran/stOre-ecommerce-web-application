import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  try {
    // get token
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    // decoding token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "User not autherized" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};
