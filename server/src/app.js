const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const fromRouter = require("./routes/fromRoutes");
const videoRouter = require("./routes/videoRoutes");
const leaderRouter = require("./routes/LeaderBoardRoutes");
const courseRouter = require("./routes/courseRoutes");
const profileRouter = require('./routes/profileRoutes');
const certificateRouter = require("./routes/certificateRoute");
const passport = require('passport');
const session = require('express-session');
const errorHandler = require('./middleware/error_handler');

const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const MYIP = process.env.MY_IP;
console.log(MYIP)
const allowedOrigins = [
  `http://${MYIP}:5173`, 
  'http://localhost:5173',
  'https://tpmljttm-5173.inc1.devtunnels.ms',
];

app.use(errorHandler);
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  credentials: true
};
app.use(bodyParser.json());

app.use(cors(corsOptions));

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None'
  }
}));

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

// Google Authentication route
app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;

  try {
    // Use the access token to fetch user info from Google
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token}` }
    });

    const { sub, email, given_name, family_name, picture } = userInfoResponse.data;

    let user = await prisma.user.findUnique({ where: { google_id: sub } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          google_id: sub,
          email,
          username: email.split('@')[0],
          first_name: given_name,
          last_name: family_name,
          profilePic: picture,
        },
      });
    }

    res.json({
      user: {
        userId: user.user_id, // Include user_id in the response
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        profilePic: user.profilePic
      }
    });
  } catch (error) {
    console.error('Error processing Google authentication:', error);
    res.status(400).json({ error: 'Authentication failed' });
  }
});

// Routes setup
app.use('/auth', authRoutes);
app.use("/course", courseRouter);
app.use("/user", userRoutes);
app.use('/from', fromRouter);
app.use('/vid', videoRouter);
app.use('/leaderboard', leaderRouter);
app.use('/profile', profileRouter);
app.use('/certificate', certificateRouter);


// Error handling middleware
app.use(errorHandler);

module.exports = app;