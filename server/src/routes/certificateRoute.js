// routes/courseRoutes.js
const express = require("express");
const { getCertificate, getData } = require("../controllers/certificateController");

const router = express.Router();

// router.post("/", getCertificate);
router.post("/", getData);
router.post("/get", getCertificate);

module.exports = router;
