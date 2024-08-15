const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateProgressForUser(username) {
    // Fetch the user by username
    const user = await prisma.user.findUnique({
        where: { username },
        include: {
            course_progress: {
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
        return;
    }

    for (const courseProgress of user.course_progress) {
        const course = courseProgress.course;

        // Fetch completed videos for the user
        const completedVideos = await prisma.userVideoProgress.findMany({
            where: { userId: user.user_id, completed: true },
            include: { video: { include: { chapter: true } } }
        });

        // Calculate course progress
        const courseProgressPercentage = calculateCourseProgress(course, completedVideos.map(cv => ({
            chapterId: cv.video.chapterId,
            videoId: cv.videoId
        })));
        console.log("COURSE PROGRESS ",courseProgressPercentage)
        // console.log(`Course progress for ${course.title}: ${courseProgressPercentage}%`);

        // Update course progress
        await prisma.userCourseProgress.update({
            where: {
                id: courseProgress.id
            },
            data: {
                completed_course: courseProgressPercentage,
                completed: courseProgressPercentage === 100
            }
        });
    }

    console.log(`Progress updated successfully for user: ${username}`);
}

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

// Replace 'username_here' with the actual username
updateProgressForUser('user15222')
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });