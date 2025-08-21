// src/routes/loadRoutes.js
const express = require("express");
const router = express.Router();
const {
  searchLoads,
  updateLoad,
  createLoad,
  deleteLoad,
  getAllLoads,
  // getLoadImages, // если включишь presigned-эндпоинт
} = require("../controllers/loadController");
const { authenticateUser } = require("../middleware/AuthMiddleware");
const { checkRole } = require("../middleware/AdminMiddleware");
const { uploadForLoads, processAndUploadToS3 } = require("../middleware/fileMiddlewareS3"); // <-- путь и имя совпадёт с твоим

router.get("/", searchLoads);
router.get(
  "/all",
  authenticateUser,
  checkRole("admin", "assistent", "partner"),
  getAllLoads
);

router.post(
  "/",
  authenticateUser,
  checkRole("admin", "assistent"),
  uploadForLoads,
  processAndUploadToS3,     // <-- тут
  createLoad
);

router.put(
  "/:id",
  authenticateUser,
  checkRole("admin", "assistent"),
  uploadForLoads,
  processAndUploadToS3,     // <-- и тут
  updateLoad
);

router.delete("/:id", authenticateUser, checkRole("admin"), deleteLoad);

// router.get("/:id/images", authenticateUser, getLoadImages);

module.exports = router;
