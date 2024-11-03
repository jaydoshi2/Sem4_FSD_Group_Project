const pdf = require('html-pdf');
const fs = require('fs');
const path=require('path')

// Install node-html-to-image:
// npm install node-html-to-image

const nodeHtmlToImage = require('node-html-to-image');

exports.getCertificate = async (req, res) => {
    const { username, courseName } = req.body;
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Certificate of Completion</title>
        <style>
            body {
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background-color: #f0f2f5;
                font-family: Arial, sans-serif;
                color: #333;
                margin: 0;
            }
    
            .certificate-container {
                text-align: center;
                background-color: #e5e8ec;
                padding: 2rem;
                border-radius: 8px;
                width: 100%;
                max-width: 600px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
    
            .logo {
                width: 100px;
                margin: 0 auto 1rem;
                border-radius: 50%;
                overflow: hidden;
            }
    
            .logo img {
                width: 100%;
                height: auto;
                object-fit: cover;
            }
    
            .certificate-title {
                font-size: 1.5rem;
                font-weight: bold;
                color: #333;
                margin: 1rem 0;
                text-transform: uppercase;
            }
    
            .separator {
                height: 2px;
                background-color: #333;
                margin: 1.5rem 0;
                width: 80%;
                margin-left: auto;
                margin-right: auto;
            }
    
            .congratulations {
                font-size: 1rem;
                color: #555;
            }
    
            .highlight {
                font-weight: bold;
                color: #333;
            }
        </style>
    </head>
    <body>
        <div class="certificate-container">
            <div class="logo">
                <img src="logo.png" alt="Logo">
            </div>
            <div class="certificate-title">
                Certificate of Completion<br>JavaScript Fundamentals
            </div>
            <div class="separator"></div>
            <div class="congratulations">
               <p>Congratulations <strong>${username}</strong> For Successfully Completion Of ${courseName} Course.</p>
            </div>
        </div>
    </body>
    </html>
    
    
    `
    try {
        const image = await nodeHtmlToImage({
            html: htmlContent,
            quality: 100,
            type: 'png',
            puppeteerArgs: {
                args: ['--no-sandbox']
            }
        });

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Disposition': `attachment; filename=${username}-certificate.png`
        });
        res.end(image);

    } catch (error) {
        console.error('Error generating certificate:', error);
        res.status(500).json({ error: 'Failed to generate certificate' });
    }
};


// Check if certificate exists
exports.checkCertificate = async (req, res) => {
    const { userId, courseId } = req.query;
    
    try {
        const existingCertificate = await prisma.certificates.findUnique({
            where: {
                userId_courseId: {
                    userId: userId,
                    courseId: parseInt(courseId)
                }
            }
        });

        if (existingCertificate) {
            return res.json({
                exists: true,
                certificateUrl: existingCertificate.certificate_link
            });
        }

        return res.json({ exists: false });
    } catch (error) {
        console.error('Error checking certificate:', error);
        return res.status(500).json({ error: 'Failed to check certificate' });
    }
};
    
// Store certificate image URL
exports.storeImage = async (req, res) => {
    const { userId, courseId, imageUrl } = req.body;
    
    try {
        // Check if certificate already exists
        const existingCertificate = await prisma.certificates.findUnique({
            where: {
                userId_courseId: {
                    userId: userId,
                    courseId: parseInt(courseId)
                }
            }
        });

        if (existingCertificate) {
            return res.status(409).json({ 
                message: 'Certificate already exists',
                certificateUrl: existingCertificate.certificate_link 
            });
        }

        // Create new certificate
        const newCertificate = await prisma.certificates.create({
            data: {
                certificate_link: imageUrl,
                userId: userId,
                courseId: parseInt(courseId)
            }
        });
        console.log(newCertificate)
        res.status(201).json({
            message: 'Certificate stored successfully',
            certificate: newCertificate
        });
    } catch (error) {
        console.error('Error storing certificate:', error);
        res.status(500).json({ error: 'Failed to store certificate' });
    }
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
