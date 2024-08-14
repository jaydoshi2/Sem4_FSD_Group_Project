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
  async findUserByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }

  async saveResetToken(userId, resetToken) {
    return prisma.user.update({
      where: { user_id: userId },
      data: { resetToken }
    });
  }

  
  async findUserByResetToken(resetToken) {
    return prisma.user.findFirst({
      where: {
        resetToken: resetToken
      }
    });
  }

  async updateUserPasswordByResetToken(resetToken, newPassword) {
    // Find user by reset token
    const user = await this.findUserByResetToken(resetToken);

    if (!user) {
      throw new Error('Invalid or expired token');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear reset token
    return prisma.user.update({
      where: { user_id: user.user_id },  // Use user_id for the update operation
      data: {
        password: hashedPassword,
        resetToken: null  // Clear reset token after use
      }
    });
  }

}

module.exports = new AuthService();