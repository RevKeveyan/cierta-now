const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { sendMail } = require('../utils/mailer');

exports.sendQuoteRequest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    await sendMail(req.body);
    res.status(200).json({ message: 'Quote sent successfully!' });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: 'Failed to send quote', error: error.message });
  }
};

exports.createContact = async (req, res) => {
  try {
    const { address, phone, email } = req.body;
    const newContact = await Contact.create({ address, phone, email });
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create contact', error: err.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contact = await Contact.findOne().sort({ createdAt: -1 });
    
    if (!contact) {
      return res.status(404).json({ message: 'No contacts found' });
    }
    
    res.json(contact);
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to fetch contact', 
      error: err.message 
    });
  }
};
exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedContact);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update contact', error: err.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete contact', error: err.message });
  }
};