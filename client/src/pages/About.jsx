import React, { useState } from 'react';

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Full text for the "About" section
  const fullText = `Skillbridge has become a leading platform for learning. We provide high-quality courses from industry experts,
  tailored for individuals who want to excel in their careers. Our platform is flexible, affordable, and easily accessible for anyone
  who wants to enhance their knowledge. Whether you're a beginner or an experienced professional, Skillbridge has the tools and 
  resources to help you succeed. Join thousands of learners who have transformed their skills and careers through Skillbridge.`;

  // Truncated text (first 150 characters)
  const truncatedText = fullText.slice(0, 150) + '...';

  return (
    <div className='pt-16'>
      <div className="container text-center" data-aos="fade-up">
        {/* Add Tailwind font size and weight to h1 */}
        <h1 className="text-[#324aad] text-3xl md:text-3xl font-bold relative inline-block pb-2.5 mb-6">
          About Skillbridge
          <span className="block w-16 h-0.5 bg-[#5c8bf5] mx-auto mt-2"></span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-start">
        {/* Left side Static Data */}
        <div className="w-full md:w-1/3 flex flex-col justify-center items-start p-4">
          {/* Static Data */}
          <p className="text-gray-700 text-lg mb-2"><strong>Founded:</strong> 2020</p>
          <p className="text-gray-700 text-lg mb-2"><strong>Location:</strong> San Francisco, CA</p>
          <p className="text-gray-700 text-lg mb-2"><strong>Mission:</strong> Empower learners to achieve career success</p>
          <p className="text-gray-700 text-lg"><strong>Values:</strong> Quality, Flexibility, Accessibility</p>
        </div>

        {/* Right side text and toggle button */}
        <div className="w-full md:w-2/3 md:pl-8 flex items-center">
          <div>
            <p className="text-gray-700 text-lg">
              {isExpanded ? fullText : truncatedText}
            </p>
            <button
              onClick={toggleExpanded}
              className="mt-4 text-blue-600 hover:underline focus:outline-none"
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
