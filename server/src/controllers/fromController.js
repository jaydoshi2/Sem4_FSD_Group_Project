const { getFirstChapterAndVideo } = require('../services/fromService');

const getFirstChapterAndVideoController = async (req, res) => {
    const { courseId } = req.params;

    try {
        const result = await getFirstChapterAndVideo(parseInt(courseId));
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getFirstChapterAndVideoController };
