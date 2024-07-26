import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Slider from './components/Slider';
import './styles/variable.css';

const App = () => {
  return (
    <ThemeProvider>
      <Slider />
    </ThemeProvider>
  );
};

export default App;