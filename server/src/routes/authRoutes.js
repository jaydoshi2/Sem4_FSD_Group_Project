const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authenticate'); // Change this line
const passport = require('passport');
const { validate } = require('../middleware/validate');
const passportConfig = require('../config/passportConfig');

const router = express.Router();

router.post(
    '/signup',
    validate([
      body('email').isEmail().normalizeEmail(),
      body('password').isLength({ min: 6 }),
      body('username').trim().isLength({ min: 3 }),
      body('first_name').trim().notEmpty(),
      body('last_name').trim().notEmpty(),
      body('birthDate').optional().isISO8601().toDate(),
    ]),
    authController.signup
  );
router.post('/login', authController.login);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {     successRedirect: "http://localhost:3000/Home",
  failureRedirect: "http://localhost:3000/login"}), authController.googleCallback);
router.post('/logout', authenticate, authController.logout); // Change this line
router.post('/refresh-token', authController.refreshToken); // Add this line

module.exports = router;