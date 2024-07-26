const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
// const authRoutes = require('./routes/authRoutes');
const courseRouter = require("./routes/courseRoutes");
// const errorHandler = require('./middleware/errorHandler'); // Uncomment if you have an error handler middleware

dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static('public'));

// Routes setup
// app.use('/auth', authRoutes);
app.use("/course", courseRouter);

// Error handling middleware
// app.use(errorHandler); // Uncomment if you have an error handler middleware

module.exports = app;
