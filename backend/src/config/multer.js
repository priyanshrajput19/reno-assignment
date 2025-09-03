import multer from "multer";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists alongside app at ../public/schoolImages
const publicDir = path.join(__dirname, "..", "public");
const imagesDir = path.join(publicDir, "schoolImages");
fs.mkdirSync(imagesDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesDir);
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, name) {
      if (err) return cb(err);
      const fileName = name.toString("hex") + path.extname(file.originalname);
      cb(null, fileName);
    });
  },
});

const upload = multer({ storage });
export default upload;
