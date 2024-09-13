// routes/courseRoutes.js
const express = require("express");
const { getAllCourses,getCourses, getCourseDetails } = require("../controllers/courseController");

const router = express.Router();

// Log to check if the route is being hit
router.use((req, res, next) => {
  console.log("Course route accessed");
  next();
});

// Log to check if the route is being hit
router.use((req, res, next) => {
  console.log("Course route accessed");
  next();
});

router.get("/getall", getAllCourses);

router.get("/", getCourses);
router.get("/:course_id", getCourseDetails);

module.exports = router;