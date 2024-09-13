const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
// Serve static files from the 'public' directory
const publicPath = path.join(__dirname, '..', 'public');

// Serve static files from the 'public' directory
app.use(express.static(publicPath));

console.log('Public directory path:', publicPath);
fs.writeFileSync(publicPath+"/data.txt", "heelo world ");