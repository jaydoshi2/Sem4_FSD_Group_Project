import React from 'react';
import four from "../assets/images/hero-img.png";
import NumAnimation from '../components/NumAnimation';
import Testimonials from './Testimonials';
import About from './About';
const Home = () => {
  return (
    <div className="home-page bg-[#adbbda]">
      {/* Hero Section */}
      <div className="h-screen bg-[#3d52a0] flex items-center relative p-8">
        {/* Centered text */}
        <div className="text-white text-center space-y-6">
          <div className="text-4xl font-bold mt-8">
            Elevate Your Skills with <span className="text-yellow-400">Skill Bridge</span>
          </div>
          <p className="text-lg max-w-2xl mx-auto">
            Whether you're looking to advance your career, learn something new, or explore a passion, Skill Bridge
            offers courses that help you gain the knowledge and expertise to succeed. From technology to business,
            creative skills, and more — unlock your potential today.
          </p>
          <button className="bg-yellow-400 text-blue-900 font-semibold py-2 px-6 rounded-lg hover:bg-yellow-500 transition duration-300">
            Start Learning Now
          </button>
        </div>

        {/* Image moving up-down */}
        <img
          src={four}
          alt="Moving Image"
          className="absolute right-10 h-[32rem] w-auto animate-upDown" // Increased size
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
