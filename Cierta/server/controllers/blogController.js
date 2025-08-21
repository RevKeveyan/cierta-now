const Blog = require('../models/Blog');
const { validationResult } = require('express-validator');
// В контроллере blogsController.js
exports.getNewestBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne()
      .sort({ createdAt: -1 }) // Сортировка по дате создания (новые сначала)
      .limit(1); // Берем только первую запись

    if (!blog) {
      return res.status(404).json({ message: 'No blogs found' });
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to get newest blog', 
      error: err.message 
    });
  }
};
exports.createBlog = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const { title, content, author, category } = req.body;
    
    const newBlog = new Blog({
      title,
      content,
      author: author || 'Admin',
      category: category || 'General',
      image: req.file.path.replace(/\\/g, '/')
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to create blog', 
      error: err.message 
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    // Получаем параметры пагинации из запроса
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    
    // Проверяем валидность параметров
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return res.status(400).json({ 
        message: 'Invalid pagination parameters' 
      });
    }

    // Рассчитываем смещение
    const skip = (page - 1) * limit;

    // Выполняем параллельные запросы для данных и общего количества
    const [blogs, total] = await Promise.all([
      Blog.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Blog.countDocuments()
    ]);

    // Рассчитываем общее количество страниц
    const totalPages = Math.ceil(total / limit);

    res.json({
      blogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to get blogs', 
      error: err.message 
    });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to get blog', 
      error: err.message 
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const updateData = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      category: req.body.category,
      ...(req.file && { image: req.file.path.replace(/\\/g, '/') })
    };

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to update blog', 
      error: err.message 
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to delete blog', 
      error: err.message 
    });
  }
};