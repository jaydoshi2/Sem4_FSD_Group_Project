// routes/videoRoutes.js

const express = require('express');
const videoController = require('../controllers/videoController');
const path = require('path');
const router = express.Router();

// Get course progress by course ID
router.post('/course-progress/:courseId', videoController.getCourseProgress);
// Get video details by video ID
router.get('/video-details/:videoId', videoController.getVideoDetails);

// Like a video
router.post('/like-video', videoController.likeVideo);

// Dislike a video
router.post('/dislike-video', videoController.dislikeVideo);

router.post('/update-chapter-course-progress', videoController.markChapterAndCourseCompleted);
router.post('/update-progress', videoController.updateProgress)
router.post('/getpoints', videoController.getpoints)


// const dataRoutes = require('./routes')
// const TranscriptAPI = require('youtube-transcript-api');
const cors = require('cors'); // Import the CORS middleware
const fs = require('fs');
const dotenv = require('dotenv')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { AssemblyAI } = require('assemblyai');
const axios = require('axios');

var questions = [];
var options = [];
var answers = [];

const genAI = new GoogleGenerativeAI("AIzaSyBgCDR02nUjEfH2LXfhatnwxxI4mOXZlts");
const publicPath = path.join(__dirname, '..', 'public');

// Serve static files from the 'public' directory
router.use(express.static(publicPath));

console.log('Public directory path:', publicPath);


// GET: Retrieve generated MCQs for a user
router.get('/generate-mcqs', (req, res) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(401).send({ success: false, message: "Unauthorized: No access token provided" });
    }

    // Retrieve processed MCQs from the Map
    const mcqs = userDataMap.get(`${accessToken}_processed_mcqs`);

    if (mcqs) {
        res.status(200).json({
            success: true,
            questions: mcqs.questions,
            options: mcqs.options,
            answers: mcqs.answers
        });
        userDataMap.delete(`${accessToken}_transcript`);
        userDataMap.delete(`${accessToken}_mcqs`);
        userDataMap.clear(`${accessToken}_processed_mcqs`)
    } else {
        res.status(404).json({ success: false, message: "MCQs not yet generated or not found." });
    }
});


const userDataMap = new Map();

router.post('/generate-mcqs', async (req, res) => {

    const accessToken = req.cookies.accessToken;

    console.log(accessToken)
    if (!accessToken) {
        return res.status(401).send({ success: false, message: "Unauthorized: No access token provided" });
    }

    try {
        const video_id = req.body.videoId;
        console.log(video_id);
        console.log("GENERATING TRANSCRIPT ");
        const params = {
            engine: "youtube_transcripts",
            video_id: video_id,
            api_key: 'gJYYWn2atWgg1vWeDhn59t9s',
        };
        let fullTranscript = "";
        // First API call without the lang parameter
        let response = await axios.get("https://www.searchapi.io/api/v1/search", { params });

        // Check if an error occurred and no transcript is available
        if (response.data.error && response.data.available_languages) {
            console.log("First API call did not return transcripts. Available languages found.");

            const availableLangs = response.data.available_languages;
            const selectedLang = availableLangs.find(lang => lang.lang === 'en' || lang.lang === 'en-IN');

            if (selectedLang) {
                console.log(`Selected language for second call: ${selectedLang.lang}`);
                params.lang = selectedLang.lang;
                response = await axios.get("https://www.searchapi.io/api/v1/search", { params });
            } else {
                return res.status(500).send({ success: false, message: 'No suitable language available for transcripts.' });
            }
        }

        const transcripts = response.data.transcripts;
        if (Array.isArray(transcripts)) {
            transcripts.forEach(segment => {
                fullTranscript += segment.text + " ";
            });
        } else {
            console.error("Transcripts not found or not an array");
            console.log("Full Response Data:", JSON.stringify(response.data, null, 2));
            return res.status(500).send({ success: false, message: 'Transcripts not found in response.' });
        }

        console.log("Full Transcript:", fullTranscript);
        userDataMap.set(`${accessToken}_transcript`, fullTranscript);

        console.log("TRANSCRIPT CREATED");
        console.log("GENERATING MCQS ");

        setTimeout(async () => {
            const prompt = `
            Generate 5 multiple-choice questions (MCQs) based only on the provided transcript. Follow this format exactly: 
            
            1: {What is the main concept discussed in the transcript?} 
               a: (Explanation A) 
               b: (Explanation B) 
               c: (Explanation C) 
               d: (Explanation D) 
               answer: [Correct Explanation from options]
            
            Instructions:
            1. **Question Source**: All questions and options must strictly come from the provided transcript. No external knowledge should be added.
            2. **Random Answer Order**: Randomize the placement of correct answers across all MCQs (a, b, c, d). Ensure all answer positions (a, b, c, d) are covered across the 5 questions to avoid any patterns.
            3. **Tricky Yet Relevant**: Make both the questions and options nuanced and tricky, focusing on less obvious details in the transcript to challenge the user's understanding.
            4. **Correct Format**: Use the exact format, with {} for questions, () for options, and [] for correct answers. The correct answer must be inside square brackets, following the format below.
            
            Example format:
            1: {What is the purpose of variables in JavaScript?} 
               a: (To store values and data) 
               b: (To control the flow of execution) 
               c: (To perform calculations) 
               d: (To define the logic of the program) 
               answer: [To store values and data]
            
            Output should only contain the MCQs in the exact format described, with no additional commentary. The questions, options, and answers should come from the content of the provided transcript.
            `;
            const p2 = userDataMap.get(`${accessToken}_transcript`);
            const completePrompt = prompt + " " + p2;
            console.log(p2);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(completePrompt);
            const response = await result.response;
            const generatedText = response.text();
            userDataMap.set(`${accessToken}_mcqs`, generatedText);
            console.log("MCQS Generated!........");

            res.send({ success: true, message: "MCQs generated successfully." });
            processMCQs(accessToken);
        }, 2000);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ success: false, message: "Error generating MCQs." });
    }
});

function processMCQs(accessToken) {
    const data = userDataMap.get(`${accessToken}_mcqs`);
    if (!data) {
        console.log("MCQs not found for this user");
        return;
    }

    const lines = data.split('\n').filter(line => line.trim() !== '');

    let questions = [];
    let options = [];
    let answers = [];
    let currentOptions = [];

    lines.forEach(line => {
        const matchQuestion = line.match(/\{(.+?)\}/);
        if (matchQuestion) {
            questions.push(matchQuestion[1].trim());
            if (currentOptions.length > 0) {
                options.push(currentOptions);
                currentOptions = [];
            }
        }

        const matchOption = line.match(/\((.+?)\)/g);
        if (matchOption) {
            const formattedOptions = matchOption.map(option => option.replace(/[()]/g, '').trim());
            currentOptions = currentOptions.concat(formattedOptions);
        }

        const matchAnswer = line.match(/\[(.+?)\]/);
        if (matchAnswer) {
            answers.push(matchAnswer[1].trim());
        }
    });

    if (currentOptions.length > 0) {
        options.push(currentOptions);
    }

    console.log("Questions:", questions);
    console.log("Options:", options);
    console.log("Answers:", answers);

    userDataMap.set(`${accessToken}_processed_mcqs`, { questions, options, answers });

}

module.exports = router;



// Handle the POST request to generate MCQs
// router.post('/generate-mcqs', async (req, res) => {

//     try {
//         const video_id = req.body.videoId
//         console.log(video_id)
//         console.log("GENERATING TRANSCRIPT ");
//         const params = {
//             engine: "youtube_transcripts",
//             video_id: video_id,
//             api_key: '8ftG7impY1iBB3uRwnAEhtn4',
//         };
//         let fullTranscript = "";
//         // First API call without the lang parameter
//         let response = await axios.get("https://www.searchapi.io/api/v1/search", { params });

//         // Check if an error occurred and no transcript is available
//         if (response.data.error && response.data.available_languages) {
//             console.log("First API call did not return transcripts. Available languages found.");

//             const availableLangs = response.data.available_languages;
//             const selectedLang = availableLangs.find(lang => lang.lang === 'en' || lang.lang === 'en-IN');

//             if (selectedLang) {
//                 console.log(`Selected language for second call: ${selectedLang.lang}`);
//                 params.lang = selectedLang.lang;
//                 response = await axios.get("https://www.searchapi.io/api/v1/search", { params });
//             } else {
//                 return res.status(500).send({ success: false, message: 'No suitable language available for transcripts.' });
//             }
//         }

//         const transcripts = response.data.transcripts;
//         if (Array.isArray(transcripts)) {
//             transcripts.forEach(segment => {
//                 fullTranscript += segment.text + " ";
//             });
//         } else {
//             console.error("Transcripts not found or not an array");
//             console.log("Full Response Data:", JSON.stringify(response.data, null, 2));
//             return res.status(500).send({ success: false, message: 'Transcripts not found in response.' });
//         }

//         console.log("Full Transcript:", fullTranscript);
//         await fs.writeFileSync(publicPath + "/data.txt", fullTranscript);


//         console.log("TRANSCRIPT CREATED");
//         console.log("GENEREATING MCQS ");

//         setTimeout(async () => {    // Generate MCQs and save to temp.txt
//             const prompt = `
//             Generate 5 multiple-choice questions (MCQs) based only on the provided transcript. Follow this format exactly:

//             1: {What is the main concept discussed in the transcript?}
//                a: (Explanation A)
//                b: (Explanation B)
//                c: (Explanation C)
//                d: (Explanation D)
//                answer: [Correct Explanation from options]

//             Instructions:
//             1. **Question Source**: All questions and options must strictly come from the provided transcript. No external knowledge should be added.
//             2. **Random Answer Order**: Randomize the placement of correct answers across all MCQs (a, b, c, d). Ensure all answer positions (a, b, c, d) are covered across the 5 questions to avoid any patterns.
//             3. **Tricky Yet Relevant**: Make both the questions and options nuanced and tricky, focusing on less obvious details in the transcript to challenge the user’s understanding.
//             4. **Correct Format**: Use the exact format, with {} for questions, () for options, and [] for correct answers. The correct answer must be inside square brackets, following the format below.

//             Example format:
//             1: {What is the purpose of variables in JavaScript?}
//                a: (To store values and data)
//                b: (To control the flow of execution)
//                c: (To perform calculations)
//                d: (To define the logic of the program)
//                answer: [To store values and data]

//             Output should only contain the MCQs in the exact format described, with no additional commentary. The questions, options, and answers should come from the content of the provided transcript.

//             `;
//             const p2 = fs.readFileSync(publicPath + "/data.txt", "utf-8").trim();
//             const completePrompt = prompt + " " + p2;
//             console.log(p2)
//             const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//             const result = await model.generateContent(completePrompt);
//             const response = await result.response;
//             const generatedText = response.text();
//             await fs.writeFileSync(publicPath + "/temp.txt", generatedText);
//             console.log("MCQS Generated!........");

//             // Wait for temp.txt to be created before sending response
//             await fs.promises.access(publicPath + "/temp.txt", fs.constants.F_OK)
//                 .then(() => {
//                     console.log("temp.txt exists");
//                     res.send({ success: true, message: "MCQs generated successfully." });
//                     readTempFile();
//                     questions = []
//                     options = []
//                     answers = []
//                 })
//                 .catch(() => {
//                     console.log("temp.txt does not exist");
//                     res.status(500).send({ success: false, message: "Error generating MCQs." });
//                 });
//         }, 2000)
//         // console.log("Generating Mcqs.......");
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send({ success: false, message: "Error generating MCQs." });
//     }
//     async function readTempFile() {


//         fs.readFile(publicPath + '/temp.txt', 'utf8', (err, data) => {
//             if (err) {
//                 console.log(err)
//                 console.error(err);
//                 return;
//             }

//             // Split the content into individual lines
//             const lines = data.split('\n').filter(line => line.trim() !== '');


//             let currentOptions = []; // Store options for the current question

//             lines.forEach(line => {
//                 const matchQuestion = line.match(/\{(.+?)\}/);
//                 if (matchQuestion) {
//                     questions.push(matchQuestion[1].trim());
//                     if (currentOptions.length > 0) {
//                         options.push(currentOptions); // Push options for the previous question
//                         currentOptions = []; // Reset options for the new question
//                     }
//                 }

//                 const matchOption = line.match(/\((.+?)\)/g);
//                 if (matchOption) {
//                     const formattedOptions = matchOption.map(option => option.replace(/[()]/g, '').trim());
//                     currentOptions = currentOptions.concat(formattedOptions);
//                 }

//                 const matchAnswer = line.match(/\[(.+?)\]/);
//                 if (matchAnswer) {
//                     answers.push(matchAnswer[1].trim());
//                 }
//             });

//             // Push options for the last question
//             if (currentOptions.length > 0) {
//                 options.push(currentOptions);
//             }

//             console.log("Questions:", questions);
//             console.log("Options:", options);
//             console.log("Answers:", answers);

//             // fs.writeFileSync(publicPath+"/temp.txt", '');

//         });

//     }
// });



// module.exports = router;

