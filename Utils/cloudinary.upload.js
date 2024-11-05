import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});

const cloudinaryUpload = async (localPath)=>{
    try {
        const uploadedLink = await cloudinary.uploader.upload(localPath);
        return uploadedLink;
    } catch (error) {
       console.log("There is some errors in your cloudinary upload controller ", error);  
    }
}
export default cloudinaryUpload;