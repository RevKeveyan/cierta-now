const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['slider', 'service'],
  },
  // Добавляем поле serviceType для типа 'service'
  serviceType: {
    type: String,
    required: function() { return this.type === 'service'; }, // Обязательно только для типа 'service'
    enum: [
      'Truckload',
      'LTL',
      'Boats',
      'Warehousing',
      'Vehicles: Cars',
      'Vehicles: RVs',
      'Vehicles: Motorcycles'
    ]
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Content', contentSchema);