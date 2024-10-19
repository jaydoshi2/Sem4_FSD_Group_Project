import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundIMG from '../assets/NotFound.jpg';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <img 
        src={NotFoundIMG} 
        alt="Not Found" 
        className="w-full md:w-2/3 lg:w-1/2 h-auto md:h-2/3 object-cover mb-6" // Adjusted for responsiveness
      />
      <button
        onClick={handleGoHome}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-800 transition duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-yellow-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
