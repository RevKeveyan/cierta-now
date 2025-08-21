// routes/userRoutes.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  getAllUsers,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { authenticateUser } = require('../middleware/AuthMiddleware');
const { checkRole } = require('../middleware/AdminMiddleware');

// Public routes
router.post('/login', 
  [
    body('email').isEmail(),
    body('password').notEmpty()
  ],
  loginUser
);

// Protected routes
router.use(authenticateUser);

router.get('/profile', getProfile);
router.get('/users', checkRole('admin'), getAllUsers);
router.post('/register',
  checkRole('admin'),
  [
    body('name').notEmpty().trim(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('role').isIn(['assistent', 'admin', 'partner'])
  ],
  registerUser
);

router.route('/users/:id')
  .put(checkRole('admin'), updateUser)
  .delete(checkRole('admin'), deleteUser);

module.exports = router;