// routes/policyRoutes.js
const express = require("express");
const {
  getSectionsByType,
  createSection,
  updateSection,
  deleteSection,
  addContentItem,
  removeContentItem,
} = require("../controllers/policyController");
const { checkRole } = require("../middleware/AdminMiddleware");
const { authenticateUser } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.get("/", getSectionsByType);

router.post("/", 
  authenticateUser, 
  checkRole("admin"), 
createSection);

router.put("/:id",
   authenticateUser, checkRole("admin"), 
updateSection);

router.delete("/:id", 
  authenticateUser, checkRole("admin"), 
  deleteSection);

router.patch(
  "/:id/content",
  authenticateUser,
  checkRole("admin"),
  addContentItem
);

router.delete(
  "/:id/content/:index",
  authenticateUser,
  checkRole("admin"),
  removeContentItem
);

module.exports = router;
