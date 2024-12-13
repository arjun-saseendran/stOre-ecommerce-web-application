import cloudinary from "cloudinary";
import dotenv from "dotenv";

// Config dotenv
dotenv.config();

// Cloudinary configuraion
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const cloudinaryInstance = cloudinary;
