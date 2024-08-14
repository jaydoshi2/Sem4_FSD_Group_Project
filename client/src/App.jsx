import React from 'react';
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Signup from './pages/SignUp';
import Course from './pages/Course';
import ResetPassword from './components/ResetPassword';
// import AuthWrapper from './components/AuthWrapper';
import ForgotPassword from './pages/ForgotPassword';
const App = () => {
  return (
    <Routes>
       <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path="/" element={<Course />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path="/course" element={<Course />} />
    </Routes>
  );
};

export default App;