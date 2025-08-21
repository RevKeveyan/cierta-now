// src/routes/uploadsProxy.js
const express = require("express");
const router = express.Router();
const { s3Get } = require("../utils/s3");

// если вдруг будут подпапки, можно сделать router.get("/*", ...)
router.get("/:filename", async (req, res) => {
  try {
    const Key = `uploads/blogs/${req.params.filename}`;
    const obj = await s3Get(Key);
    if (obj.ContentType) res.setHeader("Content-Type", obj.ContentType);
    if (obj.CacheControl) res.setHeader("Cache-Control", obj.CacheControl);
    obj.Body.pipe(res);
  } catch (e) {
    res.status(404).send("Not found");
  }
});

module.exports = router;
