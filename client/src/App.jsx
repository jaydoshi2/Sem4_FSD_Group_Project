import React from 'react';
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Signup from './pages/SignUp';
import Course from './pages/Course';
// import AuthWrapper from './components/AuthWrapper';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Course />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path="/course" element={<Course />} />
    </Routes>
  );
};

export default App;