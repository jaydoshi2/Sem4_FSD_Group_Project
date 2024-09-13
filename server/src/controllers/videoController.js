// controllers/videoController.js

const videoService = require('../services/videoService');

// Get course progress by course ID
// Get video details by video ID
exports.getVideoDetails = async (req, res) => {
    const  videoId  = parseInt(req.params.videoId, 10);

    try {
        const video = await videoService.fetchVideoDetails(videoId);
        res.json(video);
    } catch (error) {
        console.error('Error fetching video details:', error);
        res.status(500).json({ error: 'Failed to fetch video details' });
    }
};

exports.getCourseProgress = async (req, res) => {
    const userId = 'user15222-id'; // Assumes authentication middleware sets req.user.id
    const courseId = parseInt(req.params.courseId, 10);

    if (isNaN(courseId)) {
        return res.status(400).json({ error: 'Invalid course ID' });
    }

    try {
        const courseProgress = await videoService.fetchCourseProgress(userId, courseId);
        res.json(courseProgress);
    } catch (error) {
        console.error('Error fetching course progress:', error);
        res.status(500).json({ error: 'Failed to fetch course progress' });
    }
};

// Like a video
exports.likeVideo = async (req, res) => {
    const { videoId } = req.body;
    const userId ='user15222-id';

    try {
        const updatedVideo = await videoService.likeVideo(userId, videoId);
        res.json(updatedVideo);
    } catch (error) {
        console.error('Error liking the video:', error);
        res.status(500).json({ error: 'Error liking the video' });
    }
};

// Dislike a video
exports.dislikeVideo = async (req, res) => {
    const { videoId } = req.body;
    const userId = 'user15222-id';

    try {
        const updatedVideo = await videoService.dislikeVideo(userId, videoId);
        res.json(updatedVideo);
    } catch (error) {
        console.error('Error disliking the video:', error);
        res.status(500).json({ error: 'Error disliking the video' });
    }
};


exports.markChapterAndCourseCompleted = async (req, res) => {
    console.log("maker")
    const { userId, videoId, chapterId, courseId } = req.body;

    try {
        // Mark the video as completed and update chapter/course completion if applicable
        const result = await videoService.markVideoChapterAndCourseCompleted(userId, videoId, chapterId, courseId);

        if (result) {
            res.status(200).json({ success: true, message: 'Progress updated successfully.' });
        } else {
            res.status(400).json({ success: false, message: 'Could not update progress.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};
