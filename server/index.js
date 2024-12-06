import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { apiRouter } from "./routes/index.js";

// configure .env
dotenv.config();

const app = express();
const port = process.env.PORT;

// connect database
connectDB();

// common middlewares
app.use(express.json());
app.use(cookieParser());

// api v1 routes
app.use("/api", apiRouter);

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Server running on port ${process.env.PORT}`);
  }
});
