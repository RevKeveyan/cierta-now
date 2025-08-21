// src/middlewares/filemiddleware2.js
const multer = require("multer");
const sharp = require("sharp");
const { randomUUID } = require("crypto");
const mime = require("mime-types");
const { s3Put } = require("../utils/s3");

const maxSize = Number(process.env.UPLOAD_MAX_MB || 10) * 1024 * 1024;
const allowed = new Set(String(process.env.ALLOWED_MIME || "")
  .split(",").map(s => s.trim()).filter(Boolean));

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  if (allowed.size > 0 && !allowed.has(file.mimetype)) {
    return cb(new Error(`Unsupported file type: ${file.mimetype}`));
  }
  cb(null, true);
}

const uploadSingleImage = multer({ storage, limits: { fileSize: maxSize }, fileFilter }).single("image");
const uploadMultipleImages = multer({ storage, limits: { fileSize: maxSize, files: 10 }, fileFilter }).array("images", 10);
const uploadForLoads = multer({ storage, limits: { fileSize: maxSize, files: 20 }, fileFilter }).fields([
  { name: "images", maxCount: 10 },
  { name: "carrierImageFile", maxCount: 10 },
]);

// === НОВОЕ: оптимизировать и загрузить все картинки в S3, сохранить "старый" path ===
async function processAndUploadToS3(req, res, next) {
  try {
    const all = [];
    if (req.file) all.push(req.file);
    if (req.files) {
      if (Array.isArray(req.files)) all.push(...req.files);
      else Object.values(req.files).forEach(arr => all.push(...arr));
    }
    if (all.length === 0) return next();

    for (const file of all) {
      const isGif = file.mimetype === "image/gif";
      const ext = isGif ? "gif" : "webp";
      const filename = `${Date.now()}-${Math.round(Math.random()*1e9)}.${ext}`;
      const Key = `uploads/blogs/${filename}`;

      const Body = isGif
        ? file.buffer
        : await sharp(file.buffer).webp({ quality: 80 }).toBuffer();

      const ContentType = isGif ? "image/gif" : "image/webp";
      await s3Put({ Key, Body, ContentType });

      // как раньше: контроллеры читают file.path и file.filename
      file.path = Key;        // <-- ВАЖНО! сохраняем ровно 'uploads/blogs/<file>'
      file.filename = filename;
      file.mimetype = ContentType;
      file.size = Body.length;
    }

    next();
  } catch (e) {
    console.error("processAndUploadToS3 error:", e);
    next(new Error("Image optimization/upload failed"));
  }
}

module.exports = {
  uploadSingleImage,
  uploadMultipleImages,
  uploadForLoads,
  processAndUploadToS3,
};
