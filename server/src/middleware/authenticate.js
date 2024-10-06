// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const AppError = require('../utils/AppError');
const { generateAccessToken } = require('../utils/tokenUtils');

const prisma = new PrismaClient();

exports.authenticate = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    console.log(accessToken, refreshToken)
    if (accessToken || refreshToken) {
      console.error('Cookie is present');
    } else {
      console.error('Cookie is not present');
      // localStorage.clear()
    }

    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { user_id: decoded.id } });
        if (!user) {
          console.error('User not found');
          return next(new AppError('User not found', 401));
        }
        return res.json({
          isAuthenticated: true,
          userId: user.user_id,
          first_name: user.first_name,
          profilePic: user.profilePic
        });
      } catch (error) {
        if (error.name !== 'TokenExpiredError') {
          console.error('Access token invalid', error);
          // return res.status(401).json({ isAuthenticated: false });
        }
        console.error('Access token invalid or expired', error);
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
        return res.json({
          isAuthenticated: true,
          userId: user.user_id,
          first_name: user.first_name,
          profilePic: user.profilePic,
          newAccessToken
        });

      } catch (error) {
        console.error('Invalid refresh token', error);
        return next(new AppError('Invalid refresh token', 401));
      }
    } else {
      return res.json({ isAuthenticated: false });
    }
  } catch (error) {
    console.error('Authentication failed', error);
    next(new AppError('Authentication failed', 401));
  }
};