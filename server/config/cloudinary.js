import {v2 as cloudinary, v2} from 'cloudinary'

// Cloudinary configuraion
v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secrect: process.env.CLOUD_API_SECRET,
});

export const cloudinaryInstance = v2


