// const express = require('express');
// // const dataRoutes = require('./routes')
// const TranscriptAPI = require('youtube-transcript-api');
// const cors = require('cors'); // Import the CORS middleware
// const fs = require('fs');
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const { AssemblyAI } = require('assemblyai');

// var questions = [];
// var options = [];
// var answers = [];

// const app = express();

// // Use CORS middleware with specific options
// // const corsOptions = {
// //   origin: ['http://127.0.0.1:3000' ,'http://127.0.0.1:5500'],
// //   optionsSuccessStatus: 200
// // };
// app.use(cors());
// dotenv.config()
// app.use(express.json())
// app.use(express.static('public'));

// // Initialize AssemblyAI client with your API key
// const assemblyClient = new AssemblyAI({
//   apiKey: process.env.ASSEMBLY_API_KEY,
// });

// // Initialize Google Generative AI client with your API key
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// app.get('/generate-mcqs', (req, res) => {
//   // res.sendFile(__dirname + '/public/temp.txt');
//   res.json({questions,options,answers})
// });

// // Handle the POST request to generate MCQs
// app.post('/generate-mcqs', async (req, res) => {
//   var text =''
//   try {
//     console.log("GENERATING TRANSCRIPT ");
//     const transcript = await TranscriptAPI.getTranscript('ntLJmHOJ0ME');
//     console.log(transcript)
//     const text = transcript.map(item => item.text).join(' ');
//     console.log(text);
//     // Write the transcript to data.txt
//     fs.writeFileSync("../public/data.txt", text);

//     console.log("TRANSCRIPT CREATED");
//     console.log("GENEREATING MCQS ");

//     setTimeout(async()=>{    // Generate MCQs and save to temp.txt
//       const p1 = "GIVE ME 5 MCQS FROM GIVEN PARAGRAPH and i want in this format: for example : 1 : {What is the purpose of variables in JavaScript?} a : (To store values and data) b : (To control the flow of execution) c : (To perform calculations) d : (To perform calculations) answer : [To perform calculations] inside the square bracket there should be correct answer of the question from the optiosn and do not use other than {}[]() and i want same format as i mentioned above and the answers should be randomised not should be in the certain pattern that user can Identify and solve the mcqs easily all options should be covered in answers, create tricky answers not the tricky questoins/options both should be from the transcript only, it should'nt be out of it"; // Your prompt
//       const p2 =   fs.readFileSync("../public/data.txt", "utf-8").trim();
//       const prompt = p1 + " " + p2;
//       const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       const generatedText = response.text();
//       await fs.writeFileSync("../public/temp.txt", generatedText);
//       console.log("MCQS Generated!........");
      
//       // Wait for temp.txt to be created before sending response
//       await fs.promises.access("../public/temp.txt", fs.constants.F_OK)
//       .then(() => {
//         console.log("temp.txt exists");
//         res.send({ success: true, message: "MCQs generated successfully." });
//         readTempFile();
//         questions=[]
//         options=[]
//         answers=[]
//         })
//         .catch(() => {
//           console.log("temp.txt does not exist");
//           res.status(500).send({ success: false, message: "Error generating MCQs." });
//         });
//   },2000)
//     // console.log("Generating Mcqs.......");
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).send({ success: false, message: "Error generating MCQs." });
//     }
    
// });



// async function readTempFile() {
//   // const readline = require('readline');

//   // // Create a readline interface for reading from temp.txt
//   // const rl = readline.createInterface({
//   //   input: fs.createReadStream('temp.txt'),
//   //   output: process.stdout,
//   //   terminal: false
//   // });

//   // // Event listener for each line read from temp.txt
//   // rl.on('line', (line) => {
//   //   console.log('Line read:', line);
//   // });

//   // // Event listener for the end of file
//   // rl.on('close', () => {
//   //   console.log('File reading completed.');
//   // });


//    fs.readFile('../public/temp.txt', 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
  
//     // Split the content into individual lines
//     const lines = data.split('\n').filter(line => line.trim() !== '');
  

//     let currentOptions = []; // Store options for the current question
  
//     lines.forEach(line => {
//       const matchQuestion = line.match(/\{(.+?)\}/);
//       if (matchQuestion) {
//         questions.push(matchQuestion[1].trim());
//         if (currentOptions.length > 0) {
//           options.push(currentOptions); // Push options for the previous question
//           currentOptions = []; // Reset options for the new question
//         }
//       }
  
//       const matchOption = line.match(/\((.+?)\)/g);
//       if (matchOption) {
//         const formattedOptions = matchOption.map(option => option.replace(/[()]/g, '').trim());
//         currentOptions = currentOptions.concat(formattedOptions);
//       }
  
//       const matchAnswer = line.match(/\[(.+?)\]/);
//       if (matchAnswer) {
//         answers.push(matchAnswer[1].trim());
//       }
//     });
  
//     // Push options for the last question
//     if (currentOptions.length > 0) {
//       options.push(currentOptions);
//     }
  
//     console.log("Questions:", questions);
//     console.log("Options:", options);
//     console.log("Answers:", answers);

//     // fs.writeFileSync("../public/temp.txt", '');

//   });
  
// }



// // -----------------------------------------------------------------------------------------------------------------------------------------------------------------//

// // const dataRoutes = require("./routes")
// // app.get("/",(req,res)=>{
// //   res.send("Hello World")
// // })

// // app.use('/api/v1/data',dataRoutes)

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port `,process.env.PORT);
// });



const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({ secret: 'your-secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
