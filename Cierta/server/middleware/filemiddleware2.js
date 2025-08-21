const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

const processAndOptimizeImages = async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) return next();
  
  try {
    const uploadPath = "uploads/blogs/";
    await fs.mkdir(uploadPath, { recursive: true });

    const fileProcessingPromises = [];
    const allFiles = Object.values(req.files).flat();
    
    for (const file of allFiles) {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const isGif = file.mimetype === 'image/gif';
      const extension = isGif ? '.gif' : '.webp';
      const filename = uniqueName + extension;
      const filePath = path.join(uploadPath, filename);

      fileProcessingPromises.push(
        isGif
          ? fs.writeFile(filePath, file.buffer)
          : sharp(file.buffer)
              .webp({ quality: 80 })
              .toFile(filePath)
              .then(() => filePath)
      );

      // Сохраняем новую информацию о файле
      file.path = filePath;
      file.filename = filename;
    }

    await Promise.all(fileProcessingPromises);
    next();
  } catch (err) {
    console.error('Image processing error:', err);
    next(new Error('Image optimization failed'));
  }
};

module.exports = { upload, processAndOptimizeImages };