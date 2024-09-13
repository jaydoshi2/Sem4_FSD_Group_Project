const { PrismaClient } = require("@prisma/client");
const sendEmail = require('../utils/sendEmail');
const validator = require('validator');
const prisma = new PrismaClient();

exports.getUserCourses = async (req, res) => {
    try {
        const { userId } = req.body; // Assuming userId is sent as a string in the request body
        console.log("USER ID ", userId);

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
                        thumbnail_pic_link: true, // Course thumbnail image
                    },
                },
            },
        });

        console.log(userCourses);
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

