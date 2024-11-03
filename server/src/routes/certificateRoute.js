// routes/courseRoutes.js
const express = require("express");
const { getCertificate, getData,storeImage,checkCertificate } = require("../controllers/certificateController");

const router = express.Router();

// router.post("/", getCertificate);
router.post("/", getData);
router.post("/get", getCertificate);
router.post('/storeImage',storeImage)
router.get('/check', checkCertificate);

module.exports = router;
