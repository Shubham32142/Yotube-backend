// Load environment variables from .env file
// This needs to be at the very top
import dotenv from "dotenv";
dotenv.config();
// Now load Cloudinary and other modules
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import process from "process";
// Set up Cloudinary configuration using environment variables
console.log("Cloudinary Configss:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.config({
  cloud_name: "djybkxoq2",
  api_key: "952885558582619",
  api_secret: "XOiQZU9jDE9TN6bWMzRSmjSI3xg",
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    const uploadedUrl = response.secure_url;
    console.log("file is uploaded on cloudinary", uploadedUrl);
    return uploadedUrl;
  } catch (error) {
    fs.unlinkSync(localFilePath); // Remove the local file if upload failed
    return null;
  }
};

// Example Cloudinary upload using a remote image
