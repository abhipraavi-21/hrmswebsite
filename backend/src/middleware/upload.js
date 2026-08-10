import fs from "fs";
import path from "path";
import multer from "multer";
import env from "../config/env.js";
import { AppError } from "../utils/AppError.js";

const uploadDir = path.resolve(process.cwd(), env.UPLOAD_DIR);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_request, _file, callback) => {
    callback(null, uploadDir);
  },
  filename: (_request, file, callback) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "-");
    callback(null, `${Date.now()}-${safeName}`);
  },
});

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
]);

export const upload = multer({
  storage,
  limits: {
    fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024,
  },
  fileFilter: (_request, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      callback(new AppError("Only JPEG, PNG, WebP, and SVG files are allowed", 400));
      return;
    }

    callback(null, true);
  },
});
