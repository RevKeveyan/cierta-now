const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const http = require("http"); // для создания сервера с сокетами
require('dotenv').config();

const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
const policyRoutes = require("./routes/policyRoutes");
const contentRoutes = require("./routes/contentRoutes");
const loadRoutes = require("./routes/loadRoutes");
const supportRoutes = require("./routes/supportRoutes");
const uploadsProxy = require("./routes/s3Routes");
const s3Routes = require("./routes/s3Routes");

const app = express();
const server = http.createServer(app); // оборачиваем app в сервер
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use("/uploads/blogs", s3Routes);
app.use('/public', express.static('public'));
app.use("/uploads/blogs", uploadsProxy);

app.use('/auth', userRoutes);
app.use('/blogs', blogRoutes);
app.use('/help', supportRoutes);
app.use('/contact', contactRoutes);
app.use('/loads', loadRoutes);
app.use('/policies', policyRoutes);
app.use('/content', contentRoutes);

const { s3, BUCKET } = require("./utils/s3");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// Middleware для S3: перехватываем /uploads/* и отдаем из облака
app.get("/uploads/*", async (req, res) => {
  try {
    const Key = req.path.substring(1); // убираем первый "/"
    const command = new GetObjectCommand({ Bucket: BUCKET, Key });
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 час
    res.redirect(url); // редиректим на S3
  } catch (err) {
    console.error("S3 proxy error:", err);
    res.status(404).send("File not found");
  }
});

mongoose
  .connect(MONGO_URI, {})
  .then(() => {
    console.log("Connected to DB");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error("Connection error:", error));
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const morgan = require('morgan');
// const http = require('http');
// require('dotenv').config();

// // Routes
// const blogRoutes = require('./routes/blogRoutes');
// const contactRoutes = require('./routes/contactRoutes');
// const userRoutes = require('./routes/userRoutes');
// const policyRoutes = require('./routes/policyRoutes');
// const contentRoutes = require('./routes/contentRoutes');
// const supportRoutes = require('./routes/supportRoutes');

// const app = express();
// const server = http.createServer(app);
// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;

// // Enhanced MongoDB Connection Configuration
// const mongooseOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 30000, // 30 seconds
//   socketTimeoutMS: 45000,
//   maxPoolSize: 10,
//   minPoolSize: 2,
//   family: 4, // Use IPv4, skip IPv6
// };

// // Database Connection with Error Handling
// const connectDB = async () => {
//   try {
//     await mongoose.connect(MONGO_URI, mongooseOptions);
//     console.log('Successfully connected to MongoDB');
    
//     mongoose.connection.on('error', err => {
//       console.error('MongoDB connection error:', err);
//     });

//     mongoose.connection.on('disconnected', () => {
//       console.warn('MongoDB disconnected!');
//     });

//   } catch (error) {
//     console.error('MongoDB connection failed:', error.message);
//     process.exit(1);
//   }
// };

// // Middlewares
// app.use(cors({
//   origin: process.env.CORS_ORIGIN || '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json({ limit: '10mb' }));
// app.use(morgan('dev'));
// app.use('/uploads', express.static('uploads'));
// app.use('/public', express.static('public'));

// // Routes
// app.use('/auth', userRoutes);
// app.use('/blogs', blogRoutes);
// app.use('/help', supportRoutes);
// app.use('/contact', contactRoutes);
// app.use('/policies', policyRoutes);
// app.use('/content', contentRoutes);

// // Health Check Endpoint
// app.get('/health', (req, res) => {
//   res.status(200).json({
//     status: 'OK',
//     database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
//   });
// });

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ 
//     error: 'Internal Server Error',
//     message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
//   });
// });

// // Start Server
// const startServer = async () => {
//   try {
//     await connectDB();
//     server.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//       // console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
//     });
//   } catch (error) {
//     console.error('Failed to start server:', error);
//     process.exit(1);
//   }
// };

// // Handle shutdown gracefully
// process.on('SIGINT', async () => {
//   await mongoose.connection.close();
//   console.log('MongoDB connection closed');
//   process.exit(0);
// });

// startServer();