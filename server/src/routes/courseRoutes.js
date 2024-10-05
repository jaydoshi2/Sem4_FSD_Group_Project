// routes/courseRoutes.js
const express = require("express");
const { getAllCourses, getCourses, getCourseDetails,check } = require("../controllers/courseController");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

// Log to check if the route is being hit

router.get("/getall", getAllCourses);

router.get("/", getCourses);
router.get("/:course_id", getCourseDetails);
router.post('/check', check);

module.exports = router;