import React from 'react';
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Signup from './pages/SignUp';
import Course from './pages/Course';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import CourseDetails from './pages/CourseDetails';
import UserCoursesPage from './pages/UserCourse';
import ChatbotComponent from './components/ChatBot';
import ContactSection from './pages/ContactSection';
const App = () => {
  return (
    <Routes>
      <Route path="/contact-us" element={<ContactSection />} />
      <Route path = "/chatbot" element = {<ChatbotComponent/>}/>
       <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path="/" element={<Course />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path="/course" element={<Course />} />
      <Route path="/courseDetails/:courseId" element={<CourseDetails />} />
      <Route path ="/my-courses" element={<UserCoursesPage/>}/>
    </Routes>
  );
};

export default App;