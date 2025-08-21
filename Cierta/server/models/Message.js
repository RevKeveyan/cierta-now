const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  type: { type: String, enum: ['individual', 'business',], required: true },

  from: String,
  to: String,

  pickupDate: Date,
  deliveryDate: Date,

  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  company: String,

  details: String,

  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);
