import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const uploadSingleImage = async (imagePath) => {
  console.log("This is image path get in cloudinary ", imagePath);
  try {
    const uploadedImage = await cloudinary.uploader.upload(imagePath);
    return uploadedImage.url; 
  } catch (error) {
    console.error("Error in Cloudinary upload:", error);
    throw error;
  }
};
export default uploadSingleImage;