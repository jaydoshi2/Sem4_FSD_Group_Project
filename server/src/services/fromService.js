
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getFirstChapterAndVideo = async (courseId) => {
    console.log("i am comming in find first service")
    const firstChapter = await prisma.chapter.findFirst({
    where: { courseId },
    include: {
        videos: {
            select: {
                video_id: true,
            },
            orderBy: {
                video_id: 'asc',
            },
            take: 1,
        },
    },
    orderBy: {
        chapter_id: 'asc',
    },
});

console.log('First Chapter:', firstChapter); // Log the result

if (!firstChapter) {
    throw new Error('Chapter not found');
}

const firstVideoId = firstChapter.videos.length > 0 ? firstChapter.videos[0].video_id : null;

return {
    chapter_id: firstChapter.chapter_id,
    video_id: firstVideoId,
};

};

module.exports = { getFirstChapterAndVideo };
