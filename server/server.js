import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import { app } from "./app.js";

dotenv.config();
const port = process.env.PORT;

// connect database
 connectDB().then(()=>{
  app.listen(port, () => {
    console.log(`Server runing on port ${port}`);
  });
})


