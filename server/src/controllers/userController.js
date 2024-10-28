const { PrismaClient } = require("@prisma/client");
const sendEmail = require('../utils/sendEmail');

const validator = require('validator');
const prisma = new PrismaClient();
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_test_pVMPiZnpHDsa6g',
  key_secret: '0ZiI8iZ185Dx20ZY9S1Mck12'
});

exports.getUserCourses = async (req, res) => {
    try {
        const { userId } = req.body; // Assuming userId is sent as a string in the request body

        const userCourses = await prisma.userCourseProgress.findMany({
            where: {
                userId: userId,
            },
            select: {
                completed_course: true, // Percentage of course completion
                enrolledAt: true,       // Date when the user enrolled
                course: {
                    select: {
                        title: true,
                        thumbnail_pic_link: true,
                        description:true, // Course thumbnail image
                        course_id:true,
                    },
                },
            },
        });

          res.status(200).json(userCourses); // Send the result as a response

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "ERROR IN GETTING USER COURSES" }); // Send an error response
    }
};

exports.getCertificateOfUser = async(req,res) =>{
    
} 

// server/src/controllers/contactController.js



exports.sendingEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Check if all fields are filled
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // Send email
    await sendEmail({
      to: process.env.EMAIL_USER, // Replace with your email
      subject: `New Contact Form Submission: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
};

exports.payment = async (req, res) => {
  console.log("i am paymenting")
  const { amount, currency, receipt } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency,
      receipt
    });
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
}


exports.enrollUserInCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const course_id = parseInt(courseId, 10); // Correct parseInt usage

    // Start a transaction
    await prisma.$transaction(async (prisma) => {
      // 1. Add the course to UserCourseProgress with completed = false
      await prisma.userCourseProgress.create({
        data: {
          userId: userId,
          courseId: course_id,
          completed: false,
        },
      });

      // 2. Fetch chapters based on the courseId
      const chapters = await prisma.chapter.findMany({
        where: {
          courseId: course_id,
        },
      });

      // 3. Insert all chapters in UserChapterProgress using createMany
      const chapterProgressData = chapters.map((chapter) => ({
        userId: userId,
        courseId: course_id,
        chapterId: chapter.chapter_id,
        completed: false,
      }));

      await prisma.userChapterProgress.createMany({
        data: chapterProgressData,
      });

      // 4. Fetch videos for all chapters in a single query
      const chapterIds = chapters.map((chapter) => chapter.chapter_id);
      const videos = await prisma.video.findMany({
        where: {
          chapterId: { in: chapterIds },
        },
      });

      // 5. Insert all videos in UserVideoProgress using createMany
      const videoProgressData = videos.map((video) => ({
        userId: userId,
        videoId: video.video_id,
        completed: false,
      }));

      await prisma.userVideoProgress.createMany({
        data: videoProgressData,
      });
    });

    // Successful enrollment response
    res.status(200).json({
      message: 'User enrolled successfully and progress initialized for chapters and videos.',
    });
    console.log('User enrolled successfully and progress initialized for chapters and videos.');
  } catch (error) {
    console.error('Error enrolling user in course:', error);

    // Error response to the client
    res.status(500).json({
      message: 'Error enrolling user in course',
      error: error.message,
    });
  }
};


// Example usage
// enrollUserInCourse("20fac47f-2418-4fec-9160-5178c2b197c3", 13);
// exports.enrollUserInCourse=async(req,res)=> {
//   try {
//     const {userId,courseId}=req.body
//     console.log("enrolling")
//     const course_id=parseInt(10,courseId)
//     // Start a transaction
//     await prisma.$transaction(async (prisma) => {
//       // 1. Add the course to UserCourseProgress with completed = false
//       await prisma.userCourseProgress.create({
//         data: {
//           userId: userId,
//           courseId: course_id,
//           completed: false,
//         },
//       });

//       // 2. Fetch chapters based on the courseId
//       const chapters = await prisma.chapter.findMany({
//         where: {
//           courseId: course_id,
//         },
//       });

//       // 3. Iterate over each chapter and add them to UserChapterProgress
//       for (const chapter of chapters) {
//         // Add entry to UserChapterProgress for each chapter
//         await prisma.userChapterProgress.create({
//           data: {
//             userId: userId,
//             courseId: course_id,
//             chapterId: chapter.chapter_id,
//             completed: false,
//           },
//         });

//         // 4. Fetch videos based on chapterId
//         const videos = await prisma.video.findMany({
//           where: {
//             chapterId: chapter.chapter_id,
//           },
//         });

//         // 5. Add entries to UserVideoProgress for each video in the chapter
//         for (const video of videos) {
//           await prisma.userVideoProgress.create({
//             data: {
//               userId: userId,
//               videoId: video.video_id,
//               completed: false,
//             },
//           });
//         }
//       }
//     });

//     console.log('User enrolled successfully and progress initialized for chapters and videos.');
//   } catch (error) {
//     console.error('Error enrolling user in course:', error);
//   }
// }
