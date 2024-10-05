import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { default as Chatbot, default as ChatbotComponent } from './components/ChatBot';
import Footer from './components/Footer';
import NavBar from './components/Navbar';
import ResetPassword from './components/ResetPassword';
import AboutPage from './pages/AboutPage';
import ContactSection from './pages/ContactSection';
import Course from './pages/Course';
import CourseDetails from './pages/CourseDetails';
import CourseDisplay from './pages/CourseDisplay';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import LeaderBoard from './pages/LeaderBoard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/SignUp';
import Skills from './pages/Skills';
import UserCoursesPage from './pages/UserCourse';
import VideoPage from './pages/VideoPage';
import Certificate from './pages/Certificate';
import AdminDashboard from './pages/AdminPage';
const App = () => {


  return (
    <div className="App">
      <Chatbot />
      <NavBar />
      <Routes>
        <Route path=" /reset-password/:token" element={<ResetPassword />} />
        <Route path="/contact-us" element={<ContactSection />} />
        <Route path="/chatbot" element={<ChatbotComponent />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/Home1" element={<Course />} />
        <Route path="/login" element={<Login />} />
        <Route path='/contact' element={<ContactSection />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path="/course" element={<CourseDisplay />} />
        <Route path="/courseDetails/" element={<CourseDetails />} />
        <Route path="/my-courses" element={<UserCoursesPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/skill" element={<Skills />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path='/aboutpage' element={<AboutPage />} />
        <Route path="/leaderBoard" element={<LeaderBoard />} />
        <Route path="/certificate/:courseId" element={<Certificate />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;