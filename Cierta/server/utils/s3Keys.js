// src/utils/s3Keys.js
const { randomUUID } = require("crypto");
const mime = require("mime-types");

function s3KeyForLoadImage(loadId, mimetype, date = new Date(), kind = "vehicle") {
  const yyyy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const ext = mime.extension(mimetype) || "bin";
  return `loads/${yyyy}/${mm}/${loadId}/${kind}/${randomUUID()}.${ext}`;
}

module.exports = { s3KeyForLoadImage };
