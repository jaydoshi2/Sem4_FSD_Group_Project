const express = require("express");
const { getUserCourses,sendingEmail } = require("../controllers/userController");

const router = express()

router.post('/getusercourses',getUserCourses)
router.post('/sendemail',sendingEmail)

module.exports = router;