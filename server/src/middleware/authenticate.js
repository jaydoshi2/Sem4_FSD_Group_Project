const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const AppError = require('../utils/AppError');
const { generateAccessToken } = require('../utils/tokenUtils');

const prisma = new PrismaClient();

exports.authenticate = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // // // If neither token exists, reject the request early
    // if (!accessToken && !refreshToken) {
    //   return res.status(200).json({ isAuthenticated: false, message: "No authentication tokens provided." });
    // }

    // Handle Access Token
    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { user_id: decoded.id } });
        if (!user) {
          return next(new AppError('User not found', 401));
        }
        // Return user info on valid access token
        return res.json({
          isAuthenticated: true,
          userId: user.user_id,
          first_name: user.first_name,
          profilePic: user.profilePic
        });
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          console.log("Access token expired, trying refresh token");
        } else {
          return next(new AppError('Access token invalid', 401));
        }
      }
    }

    // Handle Refresh Token when Access Token fails/expired
    else if (refreshToken) {
      try {
        console.log('ELSE REFRESH TOKEN IS CALLED ')
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await prisma.user.findUnique({ where: { user_id: decoded.id } });

        // Issue new access token
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
          accessToken: newAccessToken
        });

      } catch (error) {
        console.error('Invalid or expired refresh token', error);
        return next(new AppError('Invalid refresh token', 401));
      }
    }else{
      return res.status(200).json({ isAuthenticated: false });
    }

  } catch (error) {
    console.error('Authentication failed', error);
    next(new AppError('Authentication failed', 401));
  }
};
