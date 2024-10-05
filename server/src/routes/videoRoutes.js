// routes/videoRoutes.js

const express = require('express');
const videoController = require('../controllers/videoController');

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


// Use CORS middleware with specific options
// const corsOptions = {
//   origin: ['http://127.0.0.1:3000' ,'http://127.0.0.1:5500'],
//   optionsSuccessStatus: 200
// };
router.use(cors());
dotenv.config()
router.use(express.json())
router.use(express.static('public'));

const genAI = new GoogleGenerativeAI("AIzaSyDx7S0LaJhR4DemRCIJUVDxaGBWbcx50gg");

router.get('/generate-mcqs', (req, res) => {
    res.json({ questions, options, answers })
});

// Handle the POST request to generate MCQs
router.post('/generate-mcqs', async (req, res) => {

    try {
        const video_id = req.body.videoId
        console.log("GENERATING TRANSCRIPT ");
        const params = {
            engine: "youtube_transcripts",
            video_id: video_id,
            api_key: '8ftG7impY1iBB3uRwnAEhtn4',
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
        await fs.writeFileSync("F:\\SEM4-PROJECT\\Sem4_FSD_Group_Project\\server\\src\\public\\data.txt", fullTranscript);


        console.log("TRANSCRIPT CREATED");
        console.log("GENEREATING MCQS ");

        setTimeout(async () => {    // Generate MCQs and save to temp.txt
            // const p1 = "GIVE ME 5 MCQS FROM GIVEN PARAGRAPH and i want in this format: for example : 1 : {What is the purpose of variables in JavaScript?} a : (To store values and data) b : (To control the flow of execution) c : (To perform calculations) d : (To perform calculations) answer : [To perform calculations] inside the square bracket there should be correct answer of the question from the optiosn and do not use other than {}[]() and i want same format as i mentioned above and the answers should be randomised not should be in the certain pattern that user can Identify and solve the mcqs easily all options should be covered in answers, create tricky answers not the tricky questoins/options both should be from the transcript only, it should'nt be out of it"; // Your prompt
            const p1 = `GIVE ME 5 MCQS FROM GIVEN PARAGRAPH and i want in this format: for example : 1 : {What is the purpose of variables in JavaScript?} a : (To store values and data) b : (To control the flow of execution) c : (To perform calculations) d : (To perform calculations) answer : [To perform calculations] inside the square bracket there should be correct answer of the question from the optiosn and do not use other than {}[]() and i want same format as i mentioned above and the answers should be randomised not should be in the certain pattern that user can Identify and solve the mcqs easily all options should be covered in answers, create tricky answers not the tricky questoins/options both should be from the transcript only, it should'nt be out of it`;
            const p2 = fs.readFileSync("F:\\SEM4-PROJECT\\Sem4_FSD_Group_Project\\server\\src\\public\\data.txt", "utf-8").trim();
            const prompt = p1 + " " + p2;
            console.log(p2)
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const generatedText = response.text();
            await fs.writeFileSync("F:\\SEM4-PROJECT\\Sem4_FSD_Group_Project\\server\\src\\public\\temp.txt", generatedText);
            console.log("MCQS Generated!........");

            // Wait for temp.txt to be created before sending response
            await fs.promises.access("F:\\SEM4-PROJECT\\Sem4_FSD_Group_Project\\server\\src\\public\\temp.txt", fs.constants.F_OK)
                .then(() => {
                    console.log("temp.txt exists");
                    res.send({ success: true, message: "MCQs generated successfully." });
                    readTempFile();
                    questions = []
                    options = []
                    answers = []
                })
                .catch(() => {
                    console.log("temp.txt does not exist");
                    res.status(500).send({ success: false, message: "Error generating MCQs." });
                });
        }, 2000)
        // console.log("Generating Mcqs.......");
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ success: false, message: "Error generating MCQs." });
    }
    async function readTempFile() {


        fs.readFile('F:\\SEM4-PROJECT\\Sem4_FSD_Group_Project\\server\\src\\public\\data.txt', 'utf8', (err, data) => {
            if (err) {
                console.log(err)
                console.error(err);
                return;
            }

            // Split the content into individual lines
            const lines = data.split('\n').filter(line => line.trim() !== '');


            let currentOptions = []; // Store options for the current question

            lines.forEach(line => {
                const matchQuestion = line.match(/\{(.+?)\}/);
                if (matchQuestion) {
                    questions.push(matchQuestion[1].trim());
                    if (currentOptions.length > 0) {
                        options.push(currentOptions); // Push options for the previous question
                        currentOptions = []; // Reset options for the new question
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

            // Push options for the last question
            if (currentOptions.length > 0) {
                options.push(currentOptions);
            }

            console.log("Questions:", questions);
            console.log("Options:", options);
            console.log("Answers:", answers);

            // fs.writeFileSync("../public/temp.txt", '');

        });

    }
});



module.exports = router;
