import multer from "multer";

// Config multer
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Export upload
export const upload = multer({ storage: storage });
