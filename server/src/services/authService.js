// services/authService.js

const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AuthService {
  async createUser(userData) {
    const { email, first_name, last_name, username, password, profilePic, birthDate } = userData;
  
    const exsistingEmail = await prisma.user.findUnique({
      where: { email: email },
    });
  
    if (exsistingEmail) {
      throw new Error('Username already exists');
    }
    const exsistingUsername = await prisma.user.findUnique({
      where: { username: username },
    });
  
    if (exsistingUsername) {
      throw new Error('Username already exists');
    }
  
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    return prisma.user.create({
      data: {
        email,
        first_name,
        last_name,
        username,
        password: hashedPassword,
        profilePic,
        birthDate: birthDate ? new Date(birthDate) : null,
      },
    });
  }
  async authenticateUser(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');
    if (!user.password) throw new Error('Invalid login method');
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Incorrect password');
    
    return user;
  }

  async saveRefreshToken(userId, refreshToken) {
    console.log(userId)
    return prisma.user.update({
      where: { user_id: userId },
      data: { refreshToken }
    });
  }

  async findUserById(userId) {
    return prisma.user.findUnique({ where: { id: userId } });
  }
}

module.exports = new AuthService();