// /controllers/authController.js
const authService = require('../services/authService');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');
const { setTokens } = require('../utils/cookies');
const AppError = require('../utils/AppError');
const { createPresignedPost } = require('@aws-sdk/s3-presigned-post')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const getSignedUrl = require('@aws-sdk/s3-request-presigner');

const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const dotenv = require('dotenv');
dotenv.config();

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey:  process.env.S3_ACCESS_SECRET_KEY
  },
  region: "eu-north-1"
});

console.log('S3_ACCESS_KEY_ID:', process.env.S3_ACCESS_KEY_ID);
console.log('S3_ACCESS_SECRET_KEY:', process.env.S3_ACCESS_SECRET_KEY);

// authController.js
exports.signup = async (req, res, next) => {
  try {
    console.log("STARTED SIGNING UP ")
    const user = await authService.createUser(req.body);
    console.log('USER GENERATED ', user)
    const accessToken = generateAccessToken(user.user_id);
    const refreshToken = generateRefreshToken(user.user_id);

    await authService.saveRefreshToken(user.user_id, refreshToken);

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(201).json({ message: 'User created successfully', user, accessToken });
  } catch (error) {
    // Handle specific errors like email already exists
    if (error.message.includes('Email already exists')) {
      return next(new AppError('Email already exists', 400));
    }
    next(new AppError(error.message, 500));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.authenticateUser(email, password);

    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }

    const { accessToken, refreshToken } = setTokens(res, user);
    await authService.saveRefreshToken(user.user_id, refreshToken);

    res.json({
      message: 'Logged in successfully',
      user: {
        userId: user.user_id,
        first_name: user.first_name,
        profilePic: user.profilePic,
      }
    });

  } catch (error) {
    if (error.message.includes('Incorrect password')) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    next(new AppError(error.message, 401));
  }
};

exports.googleCallback = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = setTokens(res, req.user);

    await authService.saveRefreshToken(req.user.user_id, refreshToken);
    console.log(accessToken, refreshToken, " are sent");

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None'
    });
    // res.redirect(http://${process.env.MY_IP}:5173/Course); // Redirect to Course page  
  } catch (error) {
    next(new AppError('Error processing Google login', 500));
  }
};



exports.checkAuth = async (req, res) => {
  console.log("Hii I a check auth")
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  console.log("ACCESS TOKEN ", accessToken)

  if (!req.user || !accessToken || !refreshToken) {
    // console.log("True")
    console.log("Some Cookie is not present")
    return res.json({ isAuthenticated: false });
  }
  // console.log("COOKIES ARE PRESENT")
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
  console.log("THE CHECK AUTH USER", user)
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
  const mimeType = req.query.mimeType || 'image/png';

  try {
    const { url, fields } = await createPresignedPost(s3Client, {
      Bucket: 'firstbucketofjd',
      Key:`fiverr / ${ Date.now() } / image.${ mimeType.split('/')[1] }`,
      Conditions: [
      ['content-length-range', 0, 5 * 1024 * 1024] // 5 MB max
    ],
      Fields: {
      'Content-Type': mimeType
    },
      Expires: 3600
   }); 

  console.log("Presigned URL generated:", { url, fields });
  res.json({ url, fields });
} catch (error) {
  console.error("Error generating presigned URL:", error);
  res.status(500).json({ error: "Internal server error" });
}
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const resetToken = await authService.createPasswordResetToken(email);
    const resetUrl =`http://${process.env.MY_IP}:5173/reset-password/${resetToken}`;

      await sendEmail({
        to: email,
        subject: 'Password Reset Request',
        text: `You requested a password reset.Click the link to reset your password: ${ resetUrl }. The link will expire in 15 minutes.`,
    });

  res.json({ message: 'Password reset link sent to your email' });
} catch (error) {
  console.log(error);
  next(new AppError('Error sending reset link', 500));
}
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    console.log('Received reset password request. Token:', token);
    console.log('Received password:', password);

    console.log('Received reset password request. Token:', token);

    await authService.resetPassword(token, password);

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error in resetPassword controller:', error);
    if (error.message === 'Reset token has expired') {
      next(new AppError('Reset token has expired. Please request a new reset link.', 400));
    } else if (error.message === 'Invalid reset token') {
      next(new AppError('Invalid reset token. Please request a new reset link.', 400));
    } else {
      next(new AppError('Error resetting password', 500));
    }
  }
};