const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const { sendQuoteRequest } = require('../controllers/contactController');

// Валидация данных

const validateQuote = [
  body('type')
    .isIn(['business', 'individual'])
    .withMessage('Type must be business or individual'),

  body('from').notEmpty().withMessage('From address is required'),
  body('to').notEmpty().withMessage('To address is required'),

  body('pickupDate').notEmpty().withMessage('Pickup date is required'),
  body('deliveryDate').notEmpty().withMessage('Delivery date is required'),

  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),

  body('email').isEmail().withMessage('Valid email is required'),

  // Только если тип == business
  body('company').custom((value, { req }) => {
    if (req.body.type === 'business' && !value) {
      throw new Error('Company name is required for business customers');
    }
    return true;
  }),
];

router.post('/', validateQuote, sendQuoteRequest);

module.exports = router;
