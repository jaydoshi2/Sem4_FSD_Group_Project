import React from 'react';
import four from "../assets/images/hero-img.png";
import NumAnimation from '../components/NumAnimation';
import Testimonials from './Testimonials';
import About from './About';
import {useNavigate} from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  const handlelearning = () => {
    navigate('/course')
  }
  return (
    <div className="home-page bg-[#adbbda]">
      {/* Hero Section */}
      <div className="h-screen bg-[#3d52a0] flex flex-col md:flex-row items-center justify-center relative p-8">
        {/* Centered text */}
        <div className="text-white text-center space-y-6 md:w-1/2">
          <div className="text-3xl md:text-4xl font-bold mt-8">
            Elevate Your Skills With <span className="text-yellow-400">Skill Bridge</span>
          </div>
          <p className="text-base md:text-lg max-w-2xl mx-auto">
            Whether You're Looking To Advance Your Career, Learn Something New, Or Explore A Passion, Skill Bridge
            Offers Courses That Help You Gain The Knowledge And Expertise to Succeed. From Technology To Business,
            Creative Skills, And More — Unlock Your Potential Today.
          </p>
          <button className="bg-yellow-400 text-blue-900 font-semibold py-2 px-6 rounded-lg hover:bg-yellow-500 transition duration-300" onClick={handlelearning}>
            Start Learning Now
          </button>
        </div>

        {/* Image moving up-down */}
        <img
          src={four}
          alt="Moving Image"
          className="mt-8 md:mt-0 md:ml-8 h-48 md:h-[32rem] w-auto animate-upDown"
        />
      </div>

      <div className="py-16 flex justify-center">
        <About />
      </div>
      <div className="py-16 flex justify-center">
        <NumAnimation />
      </div>
      <div className="py-16 flex justify-center w-full">
        <Testimonials />
      </div>

    </div>
  );
};

export default Home;
