import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import env from "../config/env.js";
import { models } from "../config/database.js";
import { AppError } from "../utils/AppError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, "..", "..");

export function serializeMedia(record) {
  return {
    id: record.id,
    fileName: record.file_name,
    originalName: record.original_name,
    filePath: record.file_path,
    fileUrl: record.file_url,
    fileType: record.file_type,
    mimeType: record.mime_type,
    fileSize: record.file_size,
    altText: record.alt_text,
    uploadedBy: record.uploaded_by,
    createdAt: record.createdAt,
  };
}

export async function listMedia() {
  const items = await models.Media.findAll({
    order: [["createdAt", "DESC"]],
  });

  return items.map(serializeMedia);
}

export async function createMedia(file, adminId, appUrl) {
  const relativeFilePath = path
    .join(env.UPLOAD_DIR, file.filename)
    .replaceAll("\\", "/");
  const fileUrl = `${appUrl}/uploads/${file.filename}`;

  const media = await models.Media.create({
    file_name: file.filename,
    original_name: file.originalname,
    file_path: relativeFilePath,
    file_url: fileUrl,
    file_type: file.mimetype.startsWith("image/") ? "image" : "file",
    mime_type: file.mimetype,
    file_size: file.size,
    alt_text: "",
    uploaded_by: adminId,
  });

  return serializeMedia(media);
}

export async function updateMedia(id, payload) {
  const media = await models.Media.findByPk(id);

  if (!media) {
    throw new AppError("Media file not found", 404);
  }

  await media.update({
    alt_text: payload.altText ?? media.alt_text,
  });

  return serializeMedia(media);
}

export async function deleteMedia(id) {
  const media = await models.Media.findByPk(id);

  if (!media) {
    throw new AppError("Media file not found", 404);
  }

  const absolutePath = path.resolve(backendRoot, media.file_path);
  await fs.unlink(absolutePath).catch(() => null);
  await media.destroy();
}
