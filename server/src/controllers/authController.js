// controllers/authController.js

const authService = require('../services/authService');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/tokenUtils');
const AppError = require('../utils/AppError');

exports.signup = async (req, res, next) => {
  try {
    const user = await authService.createUser(req.body);
    console.log("THE USER IS ", user)
    const accessToken = generateAccessToken(user.user_id);
    console.log("THE USER ID IS ",user.user_id)
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
    
    const accessToken = generateAccessToken(user.user_id);
    
    const refreshToken = generateRefreshToken(user.user_id);
    
    await authService.saveRefreshToken(user.user_id, refreshToken);
    
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ message: 'Logged in successfully', user, accessToken });
  } catch (error) {
    next(new AppError(error.message, 401));
  }
};

exports.googleCallback = async (req, res, next) => {
  try {
    const accessToken = generateAccessToken(req.user.user_id);
    const refreshToken = generateRefreshToken(req.user.user_id);
    
    await authService.saveRefreshToken(req.user.user_id, refreshToken);
    
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ message: 'Google login successful', accessToken }); // Change this line
  } catch (error) {
    next(new AppError('Error processing Google login', 500));
  }
};

exports.logout = (req, res) => {
  res.clearCookie('refreshToken');
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