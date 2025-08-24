const express = require("express");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const mime = require("mime-types");

const router = express.Router();

const REGION = process.env.AWS_REGION || "us-east-1";
const BUCKET = process.env.AWS_BUCKET;

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY || process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function streamFromS3(res, Key) {
  const obj = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key }));
  res.setHeader("Content-Type", obj.ContentType || mime.lookup(Key) || "application/octet-stream");
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  obj.Body.pipe(res);
}

router.get("/uploads/blogs/*", async (req, res) => {
  try {
    const rel = req.path.replace(/^\/uploads\/blogs\//, "");
    const Key = `uploads/blogs/${rel}`;
    await streamFromS3(res, Key);
  } catch (e) {
    const status = e.$metadata?.httpStatusCode || 404;
    if (!res.headersSent) res.status(status).json({ message: "File not found", error: e.message });
  }
});

// Поддержка текущих записей, где ключи уже вида loads/....
router.get("/loads/*", async (req, res) => {
  try {
    const rel = req.path.replace(/^\/+/, ""); // 'loads/...'
    await streamFromS3(res, rel);
  } catch (e) {
    const status = e.$metadata?.httpStatusCode || 404;
    if (!res.headersSent) res.status(status).json({ message: "File not found", error: e.message });
  }
});

module.exports = router;
