const PolicySection = require("../models/PolicySection");

// GET /api/policies?pageType=terms
exports.getSectionsByType = async (req, res) => {
  try {
    const { pageType } = req.query;
    if (!pageType) {
      return res.status(400).json({ message: "pageType parameter is required" });
    }

    const sections = await PolicySection.find({ pageType })
      .select("-__v")
      .lean();

    const transformed = sections.map(section => ({
      ...section,
      effectiveDate: section.effectiveDate 
        ? new Date(section.effectiveDate).toISOString().split('T')[0]
        : null
    }));

    res.json(transformed);
    
  } catch (err) {
    res.status(500).json({ 
      message: "Failed to fetch policy sections",
      error: err.message 
    });
  }
};

// POST /api/policies
// POST /api/policies
exports.createSection = async (req, res) => {
  try {
    const { 
      pageType, 
      title,
      subtitle,
      effectiveDate,
      content 
    } = req.body;

    // Валидация
    const errors = [];
    if (!pageType) errors.push("pageType is required");
    if (!title) errors.push("title is required");
    
    if (content) {
      content.forEach((item, index) => {
        if (item.type === 'paragraph' && !item.text) {
          errors.push(`Content[${index}]: text is required for paragraphs`);
        }
        if (item.type === 'list' && (!item.items || item.items.length === 0)) {
          errors.push(`Content[${index}]: items array is required for lists`);
        }
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    // Преобразование даты
    let processedDate = null;
    if (effectiveDate) {
      const date = new Date(effectiveDate);
      if (isNaN(date)) {
        errors.push("Invalid effectiveDate format");
      } else {
        processedDate = date.toISOString();
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const newSection = await PolicySection.create({
      pageType,
      title,
      subtitle: subtitle || null,
      effectiveDate: processedDate,
      content: content ? content.map(item => ({
        type: item.type,
        text: item.type === 'paragraph' ? item.text : null,
        firstSentence: item.firstSentence || null,
        items: item.type === 'list' ? item.items : null
      })) : []
    });

    // Форматирование ответа
    const response = {
      _id: newSection._id,
      pageType: newSection.pageType,
      title: newSection.title,
      subtitle: newSection.subtitle,
      content: newSection.content,
      createdAt: newSection.createdAt
    };

    // Добавляем effectiveDate только если он существует
    if (newSection.effectiveDate) {
      response.effectiveDate = newSection.effectiveDate.toISOString().split('T')[0];
    }

    res.status(201).json(response);

  } catch (err) {
    console.error("Create section error:", err);
    res.status(500).json({ 
      message: "Failed to create section",
      error: err.message,
      ...(err.name === 'ValidationError' && {
        validationErrors: Object.values(err.errors).map(e => e.message)
      })
    });
  }
};

// PUT /api/policies/:id
exports.updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Запрет изменения pageType после создания
    if (updates.pageType) {
      return res.status(400).json({ 
        message: "pageType cannot be modified after creation" 
      });
    }

    // Обработка effectiveDate
    if (updates.effectiveDate) {
      updates.effectiveDate = new Date(updates.effectiveDate).toISOString();
    }

    // Обработка контента
    if (updates.content) {
      updates.content = updates.content.map(item => ({
        type: item.type,
        text: item.type === 'paragraph' ? item.text : null,
        firstSentence: item.firstSentence || null,
        items: item.type === 'list' ? item.items : null
      }));
    }

    const updated = await PolicySection.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!updated) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json({
      ...updated.toObject(),
      effectiveDate: updated.effectiveDate?.toISOString().split('T')[0]
    });

  } catch (err) {
    console.error("Update section error:", err);
    res.status(500).json({ 
      message: "Failed to update section",
      error: err.message,
      ...(err.name === 'ValidationError' && {
        validationErrors: Object.values(err.errors).map(e => e.message)
      })
    });
  }
};

// DELETE /api/policies/:id
exports.deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PolicySection.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json({ 
      message: "Section deleted",
      deletedId: deleted._id 
    });

  } catch (err) {
    res.status(500).json({ 
      message: "Failed to delete section",
      error: err.message 
    });
  }
};

// PATCH /api/policies/:id/content
exports.addContentItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, text, firstSentence, items } = req.body;

    // Валидация
    const errors = [];
    if (!type) errors.push("type is required");
    
    if (type === 'paragraph') {
      if (!text) errors.push("text is required for paragraphs");
    } 
    else if (type === 'list') {
      if (!items || items.length === 0) {
        errors.push("items array is required for lists");
      }
    } 
    else {
      errors.push("Invalid content type");
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const contentItem = {
      type,
      text: type === 'paragraph' ? text : null,
      firstSentence: type === 'paragraph' ? firstSentence : null,
      items: type === 'list' ? items : null
    };

    const updated = await PolicySection.findByIdAndUpdate(
      id,
      { $push: { content: contentItem } },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!updated) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json(updated);

  } catch (err) {
    console.error("Add content error:", err);
    res.status(500).json({ 
      message: "Failed to add content",
      error: err.message 
    });
  }
};

// DELETE /api/policies/:id/content/:index
exports.removeContentItem = async (req, res) => {
  try {
    const { id, index } = req.params;
    const idx = parseInt(index);

    if (isNaN(idx)) {
      return res.status(400).json({ message: "Invalid content index" });
    }

    const section = await PolicySection.findById(id);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    if (idx < 0 || idx >= section.content.length) {
      return res.status(400).json({ message: "Invalid content index" });
    }

    section.content.splice(idx, 1);
    const updated = await section.save();

    res.json(updated);

  } catch (err) {
    res.status(500).json({ 
      message: "Failed to remove content",
      error: err.message 
    });
  }
};