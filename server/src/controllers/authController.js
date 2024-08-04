// /controllers/authController.js
const authService = require('../services/authService');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');
const { setTokens } = require('../utils/cookies');
const AppError = require('../utils/AppError');
const { createPresignedPost } = require('@aws-sdk/s3-presigned-post')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const getSignedUrl = require('@aws-sdk/s3-request-presigner');


const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_ACCESS_SECRET_KEY
  },
  region: "eu-north-1"
});


exports.signup = async (req, res, next) => {
  try {
    const user = await authService.createUser(req.body);
    console.log("THE USER IS ", user)
    const accessToken = generateAccessToken(user.user_id);
    console.log("THE USER ID IS ", user.user_id)
    const refreshToken = generateRefreshToken(user.user_id);

    await authService.saveRefreshToken(user.user_id, refreshToken);

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(201).json({ message: 'User created successfully', user, accessToken });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.authenticateUser(email, password);

    const { accessToken, refreshToken } = setTokens(res, user);

    await authService.saveRefreshToken(user.user_id, refreshToken);

    res.json({
      message: 'Logged in successfully',
      user: {
        user_id: user.user_id,
        // email: user.email,
        // first_name: user.first_name,
        // last_name: user.last_name,
        // profilePic: user.profilePic
      }
    });

  } catch (error) {
    next(new AppError(error.message, 401));
  }
};

exports.googleCallback = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = setTokens(res, req.user);


    await authService.saveRefreshToken(req.user.user_id, refreshToken);
    console.log(accessToken,refreshToken," are sent")
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    
    res.redirect('http://localhost:5173/Course');
  } catch (error) {
    next(new AppError('Error processing Google login', 500));
  }
};

exports.checkAuth = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!req.user && !accessToken && !refreshToken) {
    console.log("True")
    return res.json({ isAuthenticated: false });
  }

  const user = req.user;
  res.json({
    isAuthenticated: true,
    user: {
      user_id: user.user_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      profilePic: user.profilePic
    }
  });
};

exports.logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.clearCookie('accessToken')
  res.json({ message: 'Logged out successfully' });
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return next(new AppError('Refresh token not found', 401));
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await authService.findUserById(decoded.user_id);

    if (!user || user.refreshToken !== refreshToken) {
      return next(new AppError('Invalid refresh token', 401));
    }

    const accessToken = generateAccessToken(user.user_id);
    res.json({ accessToken });
  } catch (error) {
    next(new AppError('Invalid refresh token', 401));
  }
};
exports.presignedurl = async (req, res) => {
  const userId = 124;
  const mimeType = req.query.mimeType || 'image/png'; // Default to 'image/png' if not provided

  const { url, fields } = await createPresignedPost(s3Client, {
    Bucket: 'firstbucketofjd',
    Key: `fiverr/${userId}/${Math.random()}/image.jpg`,
    Conditions: [
      ['content-length-range', 0, 5 * 1024 * 1024] // 5 MB max
    ],
    Fields: {
      'Content-Type': mimeType
    },
    Expires: 3600
  });

  res.json({ url, fields });
};
