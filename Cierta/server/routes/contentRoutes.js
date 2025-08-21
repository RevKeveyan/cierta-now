const express = require("express");
const router = express.Router();
const { createContent, updateContent, deleteContent, getContentByType } = require("../controllers/contentController");
const { upload } = require("../middleware/fileMiddleware");
const { authenticateUser } = require('../middleware/AuthMiddleware');
const { checkRole } = require("../middleware/AdminMiddleware");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post(
  "/",
  authenticateUser,
  checkRole("admin"),
  upload.single("image"),
  createContent
);

router.put(
  "/:id",
  authenticateUser,
  checkRole("admin"),
  upload.single("image"),
  updateContent
);

router.delete(
  "/:id",
  authenticateUser,
  checkRole("admin"),
  deleteContent
);

router.get("/", getContentByType); 

const {
  createContact,
  getContacts,
  updateContact,
  deleteContact
} = require('../controllers/contactController');



router.post(
  "/contacts",
  authenticateUser,
  checkRole("admin"),
  createContact
);

router.get('/contacts',
  getContacts);

router.route('/contacts/:id')
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;