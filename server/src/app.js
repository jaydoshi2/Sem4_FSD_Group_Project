const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);

app.use(errorHandler);

module.exports = app;