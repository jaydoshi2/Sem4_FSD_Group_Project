
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.fetchCourseProgress = async (userId, courseId) => {
    const progress = await prisma.userCourseProgress.findFirst({
        where: { userId: userId, courseId: courseId },
        select: { completed_course: true },
    });

    const chapters = await prisma.chapter.findMany({
        where: { courseId },
        include: {
            videos: {
                include: {
                    progress: {
                        where: { userId },
                        select: { completed: true },
                    },
                },
                orderBy: { video_id: 'asc' },
            },
        },
    });

    const courseProgress = chapters.map((chapter, chapterIndex) => ({
        week: `week${chapterIndex + 1}`,
        chapter_id: chapter.chapter_id,
        videos: chapter.videos.map((video, videoIndex) => ({
            video: `video${videoIndex + 1}`,
            video_id: video.video_id,
            completed: video.progress.length > 0 ? video.progress[0].completed : false,
        })),
    }));

    return {
        completed_course: progress?.completed_course || 0,
        chapters: courseProgress,
    };
};



exports.likeVideo = async (userId, videoId) => {
    try {
        const videoIdInt = parseInt(videoId, 10);

        const interaction = await prisma.videoInteraction.findUnique({
            where: { userId_videoId: { userId, videoId: videoIdInt } },
        });

        if (interaction) {
            if (interaction.liked) return interaction;

            await prisma.video.update({
                where: { video_id: videoIdInt },
                data: {
                    dislikesCount: { decrement: 1 },
                    likesCount: { increment: 1 },
                },
            });

            return await prisma.videoInteraction.update({
                where: { userId_videoId: { userId, videoId: videoIdInt } },
                data: { liked: true, dislike: false },
            });
        } else {
            await prisma.video.update({
                where: { video_id: videoIdInt },
                data: { likesCount: { increment: 1 } },
            });

            return await prisma.videoInteraction.create({
                data: { userId, videoId: videoIdInt, liked: true, dislike: false },
            });
        }
    } catch (error) {
        console.error('Error liking the video:', error);
        throw new Error('Failed to like the video');
    }
};

exports.dislikeVideo = async (userId, videoId) => {
    try {
        const videoIdInt = parseInt(videoId, 10);

        const interaction = await prisma.videoInteraction.findUnique({
            where: { userId_videoId: { userId, videoId: videoIdInt } },
        });

        if (interaction) {
            if (interaction.dislike) return interaction;

            await prisma.video.update({
                where: { video_id: videoIdInt },
                data: {
                    dislikesCount: { increment: 1 },
                    likesCount: { decrement: 1 },
                },
            });

            return await prisma.videoInteraction.update({
                where: { userId_videoId: { userId, videoId: videoIdInt } },
                data: { liked: false, dislike: true },
            });
        } else {
            await prisma.video.update({
                where: { video_id: videoIdInt },
                data: { dislikesCount: { increment: 1 } },
            });

            return await prisma.videoInteraction.create({
                data: { userId, videoId: videoIdInt, liked: false, dislike: true },
            });
        }
    } catch (error) {
        console.error('Error disliking the video:', error);
        throw new Error('Failed to dislike the video');
    }
};

exports.fetchVideoDetails = async (videoId, userId) => {
    console.log("video id is :",videoId)
    const video = await prisma.video.findUnique({
        where: { video_id: videoId },
        select: {
            video_id: true,
            videoLink: true,
            likesCount: true,
            dislikesCount: true,
            interactions: {
                where: { userId },
                select: {
                    liked: true,
                    dislike: true,
                },
            },
        },
    });
    if (!video) {
        throw new Error('Video not found');
    }

    const userInteraction = video.interactions[0] || { liked: false, dislike: false };
    return {
        ...video,
        userLiked: userInteraction.liked,
        userDisliked: userInteraction.dislike,
    };
};

exports.markVideoAsCompleted = async (userId, videoId) => {
    try {
        // Find the existing user video progress
        console.log("aayo")
        const videoIdInt = parseInt(videoId, 10);
        const userVideoProgress = await prisma.userVideoProgress.findFirst({
            where: {
                userId: userId,
                videoId: videoIdInt,
            },
        });

        if (!userVideoProgress) {
            return null;
        }

        // Update the completed column to true
        const updatedProgress = await prisma.userVideoProgress.update({
            where: {
                id: userVideoProgress.id,
            },
            data: {
                completed: true,
            },
        });
        console.log("completed brother")
        return updatedProgress;
    } catch (error) {
        console.error('Error in marking video as completed:', error);
        throw error;
    }
};
exports.markVideoChapterAndCourseCompleted = async (userId, videoId, chapterId, courseId) => {
    try {
        // Step 1: Mark the current video as completed
        const videoIdInt = parseInt(videoId, 10);
        const chapterIdInt = parseInt(chapterId, 10);
        const courseIdInt = parseInt(courseId, 10);

        await prisma.userVideoProgress.updateMany({
            where: {
                userId: userId,
                videoId: videoIdInt
            },
            data: {
                completed: true
            }
        });

        // Step 2: Check if all videos in the chapter are completed
        const incompleteVideos = await prisma.userVideoProgress.findMany({
            where: {
                userId: userId,
                video: {
                    chapterId: chapterIdInt
                },
                completed: false
            }
        });

        // If no incomplete videos for the chapter, mark the chapter as completed
        if (incompleteVideos.length === 0) {
            await prisma.userChapterProgress.updateMany({
                where: {
                    userId: userId,
                    chapterId: chapterIdInt,
                },
                data: {
                    completed: true
                }
            });

            // Step 3: Check if all chapters in the course are completed
            const incompleteChapters = await prisma.userChapterProgress.findMany({
                where: {
                    userId: userId,
                    courseId: courseIdInt,
                    completed: false
                }
            });

            // If no incomplete chapters for the course, mark the course as completed
            if (incompleteChapters.length === 0) {
                await prisma.userCourseProgress.updateMany({
                    where: {
                        userId: userId,
                        courseId: courseIdInt
                    },
                    data: {
                        completed: true
                    }
                });
            }
        }

        return true;
    } catch (error) {
        console.error('Error updating video/chapter/course progress:', error);
        return false;
    }
};
