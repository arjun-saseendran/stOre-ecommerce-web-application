import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
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
    origin: process.env.CORS,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);


// Configure port
const port = process.env.PORT;

// Connect database
connectDB();

// Common middlewares
app.use(express.json());
app.use(cookieParser());

// Api v1 routes
app.use("/api", apiRouter);

// Configure server
app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Server running on port ${process.env.PORT}`);
  }
});
