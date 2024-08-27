const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedData() {
    try {
        // Add Users
        await prisma.user.createMany({
            data: [
                { user_id: 'user10', username: 'user10', email: 'user10@example.com', first_name: 'User', last_name: 'Three' },
                { user_id: 'user15', username: 'user15', email: 'user15@example.com', first_name: 'User', last_name: 'Four' }
            ],
            skipDuplicates: true
        });

        // Add Courses
        await prisma.course.createMany({
            data: [
                { title: 'Course 18', course_type: 'Type C', description: 'Description 18', thumbnail_pic_link: 'link18', certificate_preview_link: 'cert18', Rate: 16.8, points_providing: 15, Enrollment_Counts: 0, price: 150 },
                { title: 'Course 16', course_type: 'Type D', description: 'Description 16', thumbnail_pic_link: 'link16', certificate_preview_link: 'cert16', Rate: 16.2, points_providing: 25, Enrollment_Counts: 0, price: 250 }
            ],
            skipDuplicates: true
        });

        // Retrieve the actual course IDs based on titles
        const courses = await prisma.course.findMany({
            where: {
                title: {
                    in: ['Course 18', 'Course 16']
                }
            },
            select: {
                course_id: true,
                title: true
            }
        });

        const course18 = courses.find(course => course.title === 'Course 18').course_id;
        const course16 = courses.find(course => course.title === 'Course 16').course_id;

        // Add Chapters with the correct course IDs
        await prisma.chapter.createMany({
            data: [
                { title: 'Chapter 16', courseId: course18 },
                { title: 'Chapter 12', courseId: course18 },
                { title: 'Chapter 14', courseId: course16 }
            ],
            skipDuplicates: true
        });

        // Add Videos
        await prisma.video.createMany({
            data: [
                { title: 'Video 5', chapterId: 16, videoLink: 'link10' },
                { title: 'Video 6', chapterId: 16, videoLink: 'link11' },
                { title: 'Video 7', chapterId: 5, videoLink: 'link12' },
                { title: 'Video 8', chapterId: 5, videoLink: 'link118' },
                { title: 'Video 9', chapterId: 6, videoLink: 'link116' }
            ],
            skipDuplicates: true
        });

        // Add User Course Progress
        await prisma.userCourseProgress.createMany({
            data: [
                { userId: 'user10', courseId: course18, completed: false, completed_course: 0.0 },
                { userId: 'user15', courseId: course16, completed: false, completed_course: 0.0 }
            ],
            skipDuplicates: true
        });

        // Add User Chapter Progress
        await prisma.userChapterProgress.createMany({
            data: [
                { userId: 'user10', courseId: course18, chapterId: 16, completed: true, completed_chapters: 50.0 }, // Completed
                { userId: 'user10', courseId: course18, chapterId: 5, completed: false, completed_chapters: 0.0 }, // Not completed
                { userId: 'user15', courseId: course16, chapterId: 6, completed: true, completed_chapters: 100.0 }  // Completed
            ],
            skipDuplicates: true
        });

        // Add User Video Progress
        await prisma.userVideoProgress.createMany({
            data: [
                { userId: 'user10', videoId: 5, completed: true },
                { userId: 'user10', videoId: 6, completed: false },
                { userId: 'user15', videoId: 9, completed: true }
            ],
            skipDuplicates: true
        });

        console.log('Data seeded successfully');
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

seedData();
