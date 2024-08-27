const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {
    // await prisma.user.createMany({
    //     data: [
    //         {
    //             user_id: 'user15222-id',
    //             username: 'user15222',
    //             email: 'user15222@example.com',
    //             first_name: 'User',
    //             last_name: 'Fifteen',
    //             password: 'hashedpassword',
    //             profilePic: 'profile-pic-url',
    //             signedUpAt: new Date(),
    //         },
    //         // Add more users if needed
    //     ]
    // });

    // await prisma.course.create({
    //     data: {
    //         course_id: 1,
    //         title: 'JavaScript Basics',
    //         course_type: 'programming',
    //         description: 'Learn the basics of JavaScript.',
    //         thumbnail_pic_link: 'javascript-thumbnail-url',
    //         certificate_preview_link: 'certificate-preview-url',
    //         Rate: 4.5,
    //         points_providing: 100,
    //         Enrollment_Counts: 150,
    //         price: 200,
    //         chapters: {
    //             create: [
    //                 {
    //                     title: 'Introduction',
    //                     videos: {
    //                         create: [
    //                             { title: 'Introduction to JavaScript', videoLink: 'video-link-1' },
    //                             { title: 'Setting Up the Environment', videoLink: 'video-link-2' },
    //                         ],
    //                     },
    //                 },
    //                 {
    //                     title: 'Variables and Data Types',
    //                     videos: {
    //                         create: [
    //                             { title: 'Understanding Variables', videoLink: 'video-link-3' },
    //                             { title: 'Data Types in JavaScript', videoLink: 'video-link-4' },
    //                         ],
    //                     },
    //                 },
    //             ],
    //         },
    //     },
    // });

    // await prisma.course.create({
    //     data: {
    //         course_id: 2,
    //         title: 'Advanced CSS',
    //         course_type: 'design',
    //         description: 'Deep dive into CSS.',
    //         thumbnail_pic_link: 'css-thumbnail-url',
    //         certificate_preview_link: 'certificate-preview-url',
    //         Rate: 4.8,
    //         points_providing: 150,
    //         Enrollment_Counts: 200,
    //         price: 250,
    //         chapters: {
    //             create: [
    //                 {
    //                     title: 'CSS Grid',
    //                     videos: {
    //                         create: [
    //                             { title: 'Introduction to CSS Grid', videoLink: 'video-link-5' },
    //                             { title: 'Advanced CSS Grid', videoLink: 'video-link-6' },
    //                         ],
    //                     },
    //                 },
    //                 {
    //                     title: 'Flexbox',
    //                     videos: {
    //                         create: [
    //                             { title: 'Understanding Flexbox', videoLink: 'video-link-7' },
    //                             { title: 'Advanced Flexbox Techniques', videoLink: 'video-link-8' },
    //                         ],
    //                     },
    //                 },
    //             ],
    //         },
    //     },
    // });

    // await prisma.userCourseProgress.createMany({
    //     data: [
    //         {
    //             userId: 'user15222-id',
    //             courseId: 1,
    //             enrolledAt: new Date(),
    //             completed_course: 0.0,
    //             completed: false,
    //         },
    //         {
    //             userId: 'user15222-id',
    //             courseId: 2,
    //             enrolledAt: new Date(),
    //             completed_course: 0.0,
    //             completed: false,
    //         },
    //     ]
    // });

    // await prisma.userChapterProgress.createMany({
    //     data: [
    //         {
    //             userId: 'user15222-id',
    //             courseId: 1,
    //             chapterId: 23,
    //             completed_chapters: 0.0,
    //             completed: false,
    //         },
    //         {
    //             userId: 'user15222-id',
    //             courseId: 1,
    //             chapterId: 24,
    //             completed_chapters: 0.0,
    //             completed: false,
    //         },
    //         {
    //             userId: 'user15222-id',
    //             courseId: 2,
    //             chapterId: 25,
    //             completed_chapters: 0.0,
    //             completed: false,
    //         },
    //         {
    //             userId: 'user15222-id',
    //             courseId: 2,
    //             chapterId: 26,
    //             completed_chapters: 0.0,
    //             completed: false,
    //         },
    //     ]
    // });

    // await prisma.userVideoProgress.createMany({
    //     data: [
    //         {
    //             userId: 'user15222-id',
    //             videoId: 36,
    //             completed: fal se,
    //         },
    //         {
    //             userId: 'user15222-id',
    //             videoId: 37,
    //             completed: false,
    //         },
    //         {
    //             userId: 'user15222-id',
    //             videoId: 38,
    //             completed: false,
    //         },
    //         {
    //             userId: 'user15222-id',
    //             videoId: 39,
    //             completed: false,
    //         },
    //         {
    //             userId: 'user15222-id',
    //             videoId: 40,
    //             completed:false,
    //         },
    //         {
    //             userId: 'user15222-id',
    //             videoId: 41,
    //             completed: false,
    //         },
    //         {
    //             userId: 'user15222-id',
    //             videoId: 42,
    //             completed: false,
    //         },
    //         {
    //             userId: 'user15222-id',
    //             videoId: 43,
    //             completed: false,
    //         },
    //     ]
    // });


    await prisma.userVideoProgress.updateMany({
        where: {
            AND: [
                { userId: 'user15222-id' },
                { videoId: 3 }
            ]
        },
        data: {
            completed: true
        }
    });

}


main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });