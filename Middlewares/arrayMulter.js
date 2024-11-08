import multer from "multer";
import path from "path";
// import "../Middlewares/"
// Set up storage with multer for single file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './Public/Temp'); // Specify the directory for storing files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Define multer with storage and file filter settings for single file upload
const upload = multer({storage: storage});

// Middleware to handle a single image upload
const singleUpload = upload.single('mainBookCover'); // Expect a single file with field name 'image'

export default singleUpload;