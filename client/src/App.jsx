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
import Chatbot from './components/ChatBot';
import Home from './pages/Home';
import Skills from './pages/Skills';
const App = () => {
  return (
    <div className="App">
      <Chatbot />
      <Routes>
        <Route path="/contact-us" element={<ContactSection />} />
        <Route path="/chatbot" element={<ChatbotComponent />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/" element={<Course />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path="/course" element={<CourseDisplay />} />
        <Route path="/courseDetails" element={<CourseDetails />} />
        <Route path="/my-courses" element={<UserCoursesPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/skill" element={<Skills />} />
      </Routes>
    </div>
  );
};

export default App;
