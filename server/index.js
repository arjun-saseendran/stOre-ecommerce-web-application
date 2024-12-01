import express from "express";
import dotenv from "dotenv";
import {connectDB} from "../server/config/db.js";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
  connectDB();
  console.log(`Server runing on port ${port}`);
});
