import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Slider from './components/Slider';
import './styles/variable.css';
import Login from './components/Login'
import Signup from './components/SignUp';
import { Routes, Route } from "react-router-dom"


const App = () => {
  return (
    <Routes>
      <Route path='/Login' element={<Login />} />
      <Route path='/Signup' element={<Signup />} />
    </Routes>
  );
};

export default App;