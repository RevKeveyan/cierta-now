const mongoose = require("mongoose");

const contentItemSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ["paragraph", "list"], 
    required: true 
  },
  text: { 
    type: String,
    required: function() { return this.type === 'paragraph'; }
  },
  firstSentence: String,
  items: { 
    type: [String],
    required: function() { return this.type === 'list'; }
  }
});

const policySectionSchema = new mongoose.Schema({
  pageType: { 
    type: String, 
    enum: ["terms", "privacy"], 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  subtitle: String,
  effectiveDate: Date,
  content: {
    type: [contentItemSchema],
    default: [],
    required: true
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model("PolicySection", policySectionSchema);