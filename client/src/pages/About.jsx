import React, { useState } from 'react';

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Full text for the "About" section
  const fullText = `Skillbridge Has Become A Leading Platform For Learning. We Provide High-Quality Courses From Industry Experts,
  Tailored For Individuals Who Want To Excel In Their Careers. Our Platform Is Flexible, Affordable, And Easily Accessible For Anyone
  Who Wants To Enhance Their Knowledge. Whether You're A Beginner Or An Experienced Professional, SkillBridge Has The Tools And 
  Resources To Help You Succeed. Join Thousands Of Learners Who Have Transformed Their Skills And Careers through SkillBridge.`;

  // Truncated text (first 150 characters)
  const truncatedText = fullText.slice(0, 150) + '...';

  return (
    <div className="pt-16 px-4 md:px-0">
      <div className="container mx-auto text-center" data-aos="fade-up">
        <h1 className="text-[#324aad] text-3xl md:text-4xl font-bold relative inline-block pb-2.5 mb-6">
          About Skillbridge
          <span className="block w-16 h-0.5 bg-[#5c8bf5] mx-auto mt-2"></span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-start md:justify-between" data-aos="fade-up">
        {/* Left side Static Data */}
        <div className="w-full md:w-1/3 flex flex-col justify-center items-start p-4 md:p-6">
          {/* Static Data */}
          <p className="text-gray-700 text-lg mb-2"><strong>Founded:</strong> 2020</p>
          <p className="text-gray-700 text-lg mb-2"><strong>Location:</strong>Ahmedabad,Gujarat,India</p>
          <p className="text-gray-700 text-lg mb-2"><strong>Mission:</strong> Empower Learners To Achieve Career Success</p>
          <p className="text-gray-700 text-lg"><strong>Values:</strong> Quality, Flexibility, Accessibility</p>
        </div>

        {/* Right side text and toggle button */}
        <div className="w-full md:w-2/3 md:pl-8 flex flex-col md:flex-row items-center md:items-start justify-center">
          <div className="w-full">
            <p className="text-gray-700 text-md mb-4 text-center md:text-left">
              {isExpanded ? fullText : truncatedText}
            </p>
            <button
              onClick={toggleExpanded}
              className="mt-2 text-blue-600 hover:underline focus:outline-none"
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
