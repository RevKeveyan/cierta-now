const { validationResult } = require('express-validator');
const { sendContactMail } = require('../utils/mailer');

exports.sendContactRequest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    await sendContactMail(req.body);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending contact message:', error);
    res.status(500).json({ 
      message: 'Failed to send message',
      error: error.message 
    });
  }
};