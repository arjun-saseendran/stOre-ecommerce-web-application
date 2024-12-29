import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { apiRouter } from "./routes/index.js";

// Configure .env
dotenv.config();

// Configure app
const app = express();

// Config cors
app.use(
  cors({
    origin: [
      "https://store-ecommerce-web-application-client.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Configure port
const PORT = process.env.PORT;

// Connect database
connectDB();

// Common middlewares
app.use(express.json());
app.use(cookieParser());

// Api v1 routes
app.use("/api", apiRouter);

// Configure server
app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Server running on port ${process.env.PORT}`);
  }
});
