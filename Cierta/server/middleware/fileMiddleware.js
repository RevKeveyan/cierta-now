// src/middleware/fileMiddleware.js (замена локальной логики)
const multer = require("multer");
const sharp = require("sharp");
const { randomUUID } = require("crypto");
const { s3Put } = require("../utils/s3");

const upload = multer({ storage: multer.memoryStorage(), limits:{ fileSize: 5*1024*1024 },
  fileFilter: (req, file, cb)=> file.mimetype.startsWith("image/") ? cb(null,true):cb(new Error("Only images"),false)
});

async function uploadBlogImageToS3(req, res, next) {
  if (!req.file) return next();

  const isGif = req.file.mimetype === "image/gif";
  const buf = isGif ? req.file.buffer : await sharp(req.file.buffer).webp({ quality: 80 }).toBuffer();
  const ext = isGif ? "gif" : "webp";
  const filename = `${Date.now()}-${randomUUID()}.${ext}`;
  const Key = `uploads/blogs/${filename}`;

await s3Put({ Key, Body: file.buffer, ContentType: file.mimetype });
blog.image = Key;


  // как раньше: в контроллер пойдёт "путь", но это будет S3 key
  req.file.path = Key;
  req.file.filename = filename;
  next();
}

module.exports = { upload, uploadBlogImageToS3 };
