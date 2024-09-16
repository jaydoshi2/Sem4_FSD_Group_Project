// routes/courseRoutes.js
const express = require("express");
const { getUserData } = require("../controllers/LeaderBoardController");

const router = express.Router();

router.use((req, res, next) => {
    console.log("Course route accessed");
    next();
});

router.get("/", getUserData);

module.exports = router;