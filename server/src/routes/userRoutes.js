const express = require("express");
const { getUserCourses,sendingEmail,payment,enrollUserInCourse } = require("../controllers/userController");

const router = express()

router.post('/getusercourses',getUserCourses)
router.post('/sendemail',sendingEmail)
router.post('/make-payment', payment)
router.post('/enroll-course', enrollUserInCourse)

module.exports = router;