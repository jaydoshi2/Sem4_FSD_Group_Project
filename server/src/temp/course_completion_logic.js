const course = {
    id: 'course1',
    chapters: [
        {
            id: 'chap1',
            videos: [{ id: 'video1' }, { id: 'video2' }, { id: 'video3' }, { id: 'video4' }]
        },
        {
            id: 'chap2',
            videos: [{ id: 'video1' }, { id: 'video2' }, { id: 'video3' }]
        },
        {
            id: 'chap3',
            videos: [{ id: 'video1' }, { id: 'video2' }]
        }
    ]
};
function calculateCourseProgress(course, completedVideos) {
    const totalChapters = course.chapters.length;
    let totalProgress = 0;

    course.chapters.forEach((chapter, chapterIndex) => {
        const eachChapterWeight = 1 / totalChapters;
        const totalVideosInEachChapter = chapter.videos.length;
        let completedVideosInEachChapter = 0;

        chapter.videos.forEach((video, videoIndex) => {
            if (completedVideos.some(cv => cv.chapterId === chapter.id && cv.videoId === video.id)) {
                completedVideosInEachChapter++;
            }
        });

        const chapterProgress = (completedVideosInEachChapter / totalVideosInEachChapter) * eachChapterWeight;
        totalProgress += chapterProgress;
    });

    return totalProgress * 100; // Convert to percentage
}

let completedVideos = [];

// User completes the first video of the first chapter
completedVideos.push({ chapterId: 'chap1', videoId: 'video1' });
console.log(calculateCourseProgress(course, completedVideos)); // Outputs: 8.33333...

// User completes the first chapter
completedVideos = [
    { chapterId: 'chap1', videoId: 'video1' },
    { chapterId: 'chap1', videoId: 'video2' },
    { chapterId: 'chap1', videoId: 'video3' },
    { chapterId: 'chap1', videoId: 'video4' },
    { chapterId: 'chap2', videoId: 'video2' }
];
console.log(calculateCourseProgress(course, completedVideos)); // Outputs: 33.33333...