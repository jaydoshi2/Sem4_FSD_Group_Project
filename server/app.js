const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const courseRouter = require("./routes/courseRoutes");
const profileRouter = require('./routes/profileRoutes');
const passport = require('passport');
const session = require('express-session');
const errorHandler = require('./middleware/error_handler');

dotenv.config();

const app = express();
const MYIP = process.env.MY_IP
// const allowedOrigins = [`http://${MYIP}:5173`];
const corsOptions = {
    origin: `http://${MYIP}:5173`,
    methods: "GET,POST,PUT,DELETE",
    credentials: true
  };
  

app.use(errorHandler);
app.use(cors(corsOptions));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { 
      secure: process.env.NODE_ENV === 'production', // Only secure in production
      sameSite: 'None' // Allow cross-origin cookies
    }
  }));
// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(passport.session());
app.use(passport.initialize());
app.use(express.static('public'));

// Routes setup
app.use('/auth', authRoutes);
app.use("/course", courseRouter);
app.use('/profile', profileRouter);

// Error handling middleware
app.use(errorHandler); // Uncomment if you have an error handler middleware

module.exports = app;
