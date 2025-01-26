const express = require('express');
const connectDB = require('./config/db'); // Import database connection
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const errorHandler = require('./middlewares/errorMiddleware');
const loggingMiddleware = require('./middlewares/loggingMiddleware');
const rateLimiter = require('./middlewares/rateLimiterMiddleware');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Connect to the database
connectDB();

// Built-in Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// Security Middleware
app.use(cors());
app.use(helmet());

// Logging Middleware
app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Send cookies
  })
);
app.use(loggingMiddleware);

// Rate Limiting
app.use(rateLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Error Handling Middleware (must be last)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
