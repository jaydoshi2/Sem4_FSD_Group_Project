const app = require('./app');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const passportConfig = require('./config/passportConfig');
const cors = require('cors');
const express = require('express');


dotenv.config();

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log('Connected to database');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
