const authService = require('../services/authService');

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    const user = await authService.signup(username, email, password, firstName, lastName);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ message: 'Logged in successfully', user });
  } catch (error) {
    next(error);
  }
};

exports.googleAuth = (req, res, next) => {
  // Implement Google OAuth initiation
};

exports.googleCallback = async (req, res, next) => {
  try {
    // Implement Google OAuth callback handling
    const { user, token } = await authService.handleGoogleCallback(req);
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.redirect('/dashboard'); // Redirect to your frontend dashboard
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};