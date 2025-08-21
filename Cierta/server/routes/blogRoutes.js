const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const {
  updateBlog,
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  getNewestBlog
} = require('../controllers/blogController');
const { checkRole } = require('../middleware/AdminMiddleware');
const { authenticateUser } = require('../middleware/AuthMiddleware');
const { upload } = require('../middleware/fileMiddleware');

// Валидация
const validateBlog = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title too long (max 200 chars)'),
  // body('content').notEmpty().withMessage('Content is required'),
  body('tags')
    .optional()
    .isString().withMessage('Tags must be a comma-separated string'),
  body('deleteImage')
    .optional()
    .isBoolean().withMessage('deleteImage must be boolean')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.get('/newest/:id', getNewestBlog);

router.post(
  '/',
  authenticateUser,
  checkRole('admin'),
  // validateBlog,
  handleValidationErrors,
  upload.single('image'),
  createBlog
);
router.put(
  '/:id',
  authenticateUser,
  checkRole('admin'),
  // validateBlog,
  // handleValidationErrors,
  upload.single('image'),
  updateBlog
);


router.delete('/:id',
  authenticateUser,
  checkRole('admin'),
  deleteBlog
);

module.exports = router;