const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authenticate');
const passport = require('passport');
const { validate } = require('../middleware/validate');
const passportConfig = require('../config/passportConfig');

const router = express.Router();

router.post('/signup', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], validate, authController.signup);

router.post('/login', authController.login);

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
}));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  session: false
}), authController.googleCallback);

router.post('/logout', authenticate, authController.logout);

router.get('/check-auth', authenticate, authController.checkAuth);

module.exports = router;
