import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Public/Temp');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      console.log("This is file ", file);
      cb(null, file.originalname + '-' + uniqueSuffix);
    }
  });
  
export const upload = multer({ storage: storage });