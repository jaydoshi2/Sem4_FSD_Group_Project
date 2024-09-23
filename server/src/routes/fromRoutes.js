const express = require('express');
const { getFirstChapterAndVideoController } = require('../controllers/fromController');

const router = express.Router();

router.get('/first-chapter-video/:courseId', getFirstChapterAndVideoController);

module.exports = router;
