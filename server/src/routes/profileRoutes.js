const profileController = require('../controllers/profileController');
const express = require("express");

const router = express.Router();

router.post('/getuser', profileController.getUserDetails);

router.put('/update', profileController.updateUserDetails);

module.exports = router;
