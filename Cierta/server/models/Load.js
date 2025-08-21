const mongoose = require("mongoose");

const loadSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Boats", "Cars", "Motorcycles", "RVs"],
    },
    Vin: {
      type: String,
      unique: true,
      required: true,
    },
    category: String,
    companyName: String,

    // Participants

    carrier: {
      name: { type: String, required: true },
      contact: { type: String, required: true },
      email: { type: String, lowercase: true },
      carrierImageFile: [String],
    },
    costomerEmail: {
      type: [String], // Изменяем на массив строк
      lowercase: true,
    },
    assignedDate: { type: Date },
    // Locations
    pickUpLocation: {
      name: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: Number },
      address: { type: String },
      loc: String,
      contactPhone: String,
    },
    deliveryLocation: {
      name: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: Number },
      address: { type: String },
      loc: String,
      contactPhone: String,
    },

    // Dates and status
    deliveryDate: { type: Date },
    pickUpDate: { type: Date },
    status: {
      type: String,
      enum: ["in process", "picked up", "delivered", "cancelled"],
      default: "in process",
      required: true,
    },

    // Media
    images: [String],
    aging: Number,
    tracing: String,

    // Additional fields
    vehicleDetails: {
      make: String,
      model: String,
      year: Number,
      color: String,
      mileage: Number,
    },
    specialRequirements: String,
    insurance: Boolean,
    value: Number,
    lastEmailSent: Date,
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Load", loadSchema);
