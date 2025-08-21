const express = require('express');
const { body } = require('express-validator');
const { sendContactRequest } = require('../controllers/helpController');
const { authenticateUser } = require('../middleware/AuthMiddleware');

const router = express.Router();

const validateContact = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name too long'),
    
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
    
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ max: 150 }).withMessage('Subject too long'),
    
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ max: 2000 }).withMessage('Message too long'),
    
  body('phone')
    .optional()
    .trim()
    .matches(/^\+?[0-9\s\-()]{7,20}$/).withMessage('Invalid phone number')
];

router.post('/', validateContact, sendContactRequest);

module.exports = router;