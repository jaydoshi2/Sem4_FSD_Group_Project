const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const AppError = require('../utils/AppError');
const { generateAccessToken } = require('../utils/tokenUtils');

const prisma = new PrismaClient();

exports.authenticate = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (accessToken && refreshToken) {
      console.error('Cookie is present');
      
    }

    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { user_id: decoded.id } });
        if (!user) {
          console.error('User not found');
          return next(new AppError('User not found', 401));
        }
        req.user = user;
        return next();
      } catch (error) {
        console.error('Access token invalid or expired', error);
        // Try refresh token
      }
    }

    if (refreshToken) {
      try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await prisma.user.findUnique({ where: { user_id: decoded.id } });
        if (!user || user.refreshToken !== refreshToken) {
          console.error('Invalid refresh token');
          return next(new AppError('Invalid refresh token', 401));
        }
        const newAccessToken = generateAccessToken(user.user_id);
        res.cookie('accessToken', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 3 * 60 * 60 * 1000 // 3 hours
        });
        req.user = user;
        return next();
      } catch (error) {
        console.error('Invalid refresh token', error);
        return next(new AppError('Invalid refresh token', 401));
      }
    }
    else{
      return res.json({ isAuthenticated: false });
    }
  } catch (error) {
    console.error('Authentication failed', error);
    next(new AppError('Authentication failed', 401));
  }
};
