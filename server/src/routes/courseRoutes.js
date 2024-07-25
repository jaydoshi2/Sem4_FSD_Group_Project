// routes/courseRoutes.js
const express = require("express");
const { getCourses } = require("../controllers/courseController");

const router = express.Router();

// Log to check if the route is being hit
router.use((req, res, next) => {
  console.log("Course route accessed");
  next();
});

router.get("/", getCourses);

module.exports = router;
