
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



// Like a video
exports.likeVideo = async (userId, videoId) => {
    try {
        const videoIdInt = parseInt(videoId, 10);

        // Find interaction by composite key
        const interaction = await prisma.videoInteraction.findUnique({
            where: { userId_videoId: { userId, videoId: videoIdInt } },
        });

        if (interaction) {
            if (interaction.liked) return interaction;

            // Update video like/dislike counts
            await prisma.video.update({
                where: { video_id: videoIdInt },
                data: {
                    dislikesCount: interaction.dislike ? { decrement: 1 } : undefined, // Only decrement dislikes if it was previously disliked
                    likesCount: { increment: 1 },
                },
            });

            // Update interaction
            return await prisma.videoInteraction.update({
                where: { userId_videoId: { userId, videoId: videoIdInt } },
                data: { liked: true, dislike: false },
            });
        } else {
            // Create new interaction
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

// Dislike a video
exports.dislikeVideo = async (userId, videoId) => {
    try {
        const videoIdInt = parseInt(videoId, 10);

        // Find interaction by composite key
        const interaction = await prisma.videoInteraction.findUnique({
            where: { userId_videoId: { userId, videoId: videoIdInt } },
        });

        if (interaction) {
            if (interaction.dislike) return interaction;

            // Update video like/dislike counts
            await prisma.video.update({
                where: { video_id: videoIdInt },
                data: {
                    dislikesCount: { increment: 1 },
                    likesCount: interaction.liked ? { decrement: 1 } : undefined, // Decrement likes only if it was previously liked
                },
            });

            // Update interaction to dislike the video
            return await prisma.videoInteraction.update({
                where: { userId_videoId: { userId, videoId: videoIdInt } },
                data: { liked: false, dislike: true },
            });
        } else {
            // Create new interaction as disliked
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

exports.markVideoAsCompleted = async (userId, videoId, courseId) => {
    try {
        // Find the existing user video progress
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
        updateProgressForUser(userId, courseIdInt)

        return true;
    } catch (error) {
        console.error('Error updating video/chapter/course progress:', error);
        return false;
    }
};

async function updateProgressForUser(username, courseId) {
    // Fetch the user and their progress for the specified course
    const user = await prisma.user.findUnique({
        where: { user_id: username },
        include: {
            course_progress: {
                where: {
                    courseId: courseId // Filter by the specific courseId
                },
                include: {
                    course: {
                        include: {
                            chapters: {
                                include: {
                                    videos: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    if (!user) {
        console.log('User not found');
        return { success: false, message: 'User not found' };
    }

    const courseProgress = user.course_progress[0]; // Since we are fetching only one course, get the first element
    if (!courseProgress) {
        console.log('No progress found for the specified course');
        return { success: false, message: 'No progress found for the specified course' };
    }

    const course = courseProgress.course;

    // Fetch completed videos for the user in the specific course
    const completedVideos = await prisma.userVideoProgress.findMany({
        where: {
            userId: user.user_id,
            completed: true,
            video: {
                chapter: {
                    courseId: courseId // Ensure only videos from the specific course are considered
                }
            }
        },
        include: {
            video: {
                include: {
                    chapter: true
                }
            }
        }
    });

    // Calculate course progress
    const courseProgressPercentage = calculateCourseProgress(course, completedVideos.map(cv => ({
        chapterId: cv.video.chapterId,
        videoId: cv.videoId
    })));

    console.log(`Course progress for ${course.course_title}: ${courseProgressPercentage}%`);

    // Update course progress for the user
    const updatedCourseProgress = await prisma.userCourseProgress.update({
        where: {
            id: courseProgress.id
        },
        data: {
            completed_course: courseProgressPercentage,
            completed: courseProgressPercentage === 100
        }
    });

    console.log(`Progress updated successfully for course: ${course.course_title} and user: ${username}`);

    // Return the completion status
    if (courseProgressPercentage === 100) {
        return { success: true, message: 'Course completed', redirect: true }; // Indicate completion
    } else {
        return { success: true, message: 'Progress updated', redirect: false }; // Indicate progress
    }
}

// Helper function to calculate course progress
function calculateCourseProgress(course, completedVideos) {
    const totalChapters = course.chapters.length;
    let totalProgress = 0;

    course.chapters.forEach((chapter) => {
        const eachChapterWeight = 1 / totalChapters;
        const totalVideosInEachChapter = chapter.videos.length;
        let completedVideosInEachChapter = 0;

        chapter.videos.forEach((video) => {
            if (completedVideos.some(cv => cv.chapterId === chapter.chapter_id && cv.videoId === video.video_id)) {
                completedVideosInEachChapter++;
            }
        });

        const chapterProgress = (completedVideosInEachChapter / totalVideosInEachChapter) * eachChapterWeight;
        totalProgress += chapterProgress;
    });

    return parseFloat((totalProgress * 100).toFixed(2)); // Convert to percentage and ensure it's a float with 2 decimal places
}