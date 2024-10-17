const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authenticate');
const passport = require('passport');
const { validate } = require('../middleware/validate');
const passportConfig = require('../config/passportConfig');
const authService = require('../services/authService');

const router = express.Router();
router.post('/signup', [
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('profilePic').notEmpty().withMessage('Profile picture is required')
], authController.signup);

router.post('/login', authController.login);

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
}), authController.googleCallback);

// router.get('/google/callback', passport.authenticate('google', {
//   failureRedirect: '/login',
//   successRedirect:http://${process.env.MY_IP}:5173/Course,
//   session: false
// }), authController.googleCallback);

router.post('/logout',authController.logout);

router.get('/check-auth', authenticate, authController.checkAuth);

router.get('/presignedurl', authController.presignedurl);

router.post('/forgot-password', authController.forgotPassword)
router.post('/reset-password/:token', authController.resetPassword);


module.exports = router;