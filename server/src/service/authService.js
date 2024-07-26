const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const jwtUtils = require('../utils/jwtUtils');

const prisma = new PrismaClient();

exports.signup = async (username, email, password, firstName, lastName,) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      first_name: firstName,
      last_name: lastName,
      profilePic: '', // Set a default profile picture
      BirthDate: new Date(), // You might want to add this to your signup form
      Bio: ''
    }
  });
};

exports.login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwtUtils.generateToken(user.user_id);
  return { user, token };
};

exports.handleGoogleCallback = async (req) => {
  // Implement Google OAuth logic
  // This would involve creating or finding a user based on the Google account info
  // and generating a JWT token
};