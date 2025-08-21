// src/utils/s3.js
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const BUCKET = process.env.AWS_BUCKET;

async function s3Put({ Key, Body, ContentType, CacheControl = "public, max-age=31536000, immutable" }) {
  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key, Body, ContentType, CacheControl }));
  return Key;
}

async function s3Get(Key) {
  return s3.send(new GetObjectCommand({ Bucket: BUCKET, Key }));
}

async function s3Delete(Key) {
  await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key }));
}

module.exports = { s3, BUCKET, s3Put, s3Get, s3Delete };
