const pdf = require('html-pdf');
const fs = require('fs');
const path=require('path')
exports.getCertificate = async (req, res) => {
  const { username,courseName } = req.body;
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate of Completion</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f0f0f0;
            padding: 5vh 2vw;
            margin: 0;
        }
        .certificate {
            width: 90vw;
            max-width: 80vh;
            margin: 0 auto;
            background-color: #fff;
            padding: 5vh 4vw;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 2vh;
            box-sizing: border-box;
        }
        .header {
            text-align: center;
            margin-bottom: 5vh;
        }
        .logo-container {
            width: 40%;
            max-width: 200px;
            margin: 0 auto 3vh;
        }
        .logo {
            width: 100%;
            height: auto;
            border-radius: 50%;
            aspect-ratio:1/1;
            object-fit: cover;
            object-fit:contain;
        }
        .title {
            font-size: calc(1.5rem + 1.5vw);
            margin: 2vh 0;
            color: #333;
            text-transform: uppercase;
        }
        .separator {
            width: 100%;
            height: 0.5vh;
            background-color: #333;
            margin: 2vh 0;
        }
        .content {
            font-size: calc(0.8rem + 0.8vw);
            color: #555;
            text-align: center;
        }
        .content p {
            margin-bottom: 2vh;
        }

        @media (max-width: 600px) {
            .certificate {
                width: 95vw;
                padding: 4vh 3vw;
            }
            .logo-container {
                width: 50%;
            }
            .title {
                font-size: calc(1.2rem + 2vw);
            }
            .content {
                font-size: calc(0.9rem + 1vw);
            }
        }

        @media (max-width: 400px) {
            .certificate {
                width: 98vw;
                padding: 3vh 2vw;
            }
            .logo-container {
                width: 60%;
            }
            .title {
                font-size: calc(1rem + 2.5vw);
            }
            .content {
                font-size: calc(0.8rem + 1.2vw);
            }
        }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="header">
            <div class="logo-container">
                <img src="img1.png" alt="Logo" class="logo">
            </div>
            <h1 class="title">Certificate of Completion PYTHON</h1>
        </div>
        <div class="separator"></div>
        <div class="content">
            <p>Congratulations <strong>${username}</strong> For Successfully Completion Of ${courseName} Course.</p>
        </div>
    </div>
</body>
</html>`
     
    
    const filePath = path.join(__dirname, `../image/${username}-certificate.pdf`);
    
    pdf.create(htmlContent, { format: 'Letter', border: '10mm' }).toFile(filePath, (err, response) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.download(filePath, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            // Clean up: delete the file after sending it
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        });
    });
    
};
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getData = async (req, res) => {
    try {
        // Retrieve user ID from local storage (or simulate it for the example)
        const {userId,courseId} = req.body; // Assuming you're passing it in the request body
        const course_id1=parseInt(courseId,10)
        // Fetch the user using the userId
        const user = await prisma.user.findUnique({
            where: { user_id: userId },
            select: { first_name: true,last_name:true },
        });

        // Fetch the course using the courseId
        const course = await prisma.course.findUnique({
            where: { course_id: course_id1 },
            select: { title: true },
        });

        // Check if user and course were found
        if (!user || !course) {
            return res.status(404).json({
                message: 'User or Course not found',
            });
        }

        // Return the desired data
        const username=user.first_name+user.last_name
        return res.status(200).json({
            username: username,
            courseName: course.title,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};
