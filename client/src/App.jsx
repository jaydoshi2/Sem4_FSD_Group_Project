import React from 'react';
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Signup from './pages/SignUp';
import Course from './pages/Course';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import CourseDetails from './pages/CourseDetails';
import CourseDisplay from './pages/CourseDisplay';
import Profile from './pages/Profile';
import UserCoursesPage from './pages/UserCourse';
import ChatbotComponent from './components/ChatBot';
import ContactSection from './pages/ContactSection';
import VideoPage from './pages/VideoPage';
import LeaderBoard from './pages/LeaderBoard';
import Chatbot from './components/ChatBot';
import Home from './pages/Home';
import Skills from './pages/Skills';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
const App = () => {
  
  return (
    <div className="App">
      <Chatbot />
      <NavBar/>
      <Routes>
        <Route path="/contact-us" element={<ContactSection />} />
        <Route path="/chatbot" element={<ChatbotComponent />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/Home1" element={<Course />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<ContactSection />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path="/course" element={<CourseDisplay />} />
        <Route path="/courseDetails" element={<CourseDetails />} />
        <Route path="/my-courses" element={<UserCoursesPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/skill" element={<Skills />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path='/about' element={<About />} />

        <Route path="/leaderBoard" element={<LeaderBoard />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
