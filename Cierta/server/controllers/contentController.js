const { optimizeImages } = require("../middleware/fileMiddleware");
const Content = require("../models/Content");

exports.createContent = async (req, res) => {
  try {
    const { type, title, subtitle, text, serviceType } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const contentData = {
      type,
      title,
      subtitle,
      text,
      image: req.file.path.replace(/\\/g, '/'),
      ...(type === 'service' && { serviceType }) // Добавляем serviceType только для сервисов
    };

    const newContent = new Content(contentData);
    await newContent.save();
    
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to create content", 
      error: error.message 
    });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    const { title, subtitle, text, serviceType } = req.body;

    const updateData = {
      title,
      subtitle,
      text,
      // Обновляем serviceType только если исходный тип - service
      ...(content.type === 'service' && { serviceType }),
      ...(req.file && { image: req.file.path.replace(/\\/g, '/') })
    };

    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedContent);
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to update content", 
      error: error.message 
    });
  }
};

exports.getAllContents = async (req, res) => {
  try {
    const contents = await Content.find().sort({ createdAt: -1 });
    res.json(contents);
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to get contents", 
      error: error.message 
    });
  }
};

exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to get content", 
      error: error.message 
    });
  }
};



exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to delete content", 
      error: error.message 
    });
  }
};

exports.getContentByType = async (req, res) => {
  try {
    const { type } = req.query;
    const items = await Content.find({ type });
    res.json(items);
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to fetch content", 
      error: error.message 
    });
  }
};