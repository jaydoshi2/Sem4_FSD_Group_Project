
import React, { useState } from 'react';
import webLogo from '../assets/images/skillbridge.jpg'; 
const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('courses');

  const fullText = `Skillbridge Has Become A Leading Platform For Learning. We Provide High-Quality Courses From Industry Experts,
  Tailored For Individuals Who Want To Excel In Their Careers. Our Platform Is Flexible, Affordable, And Easily Accessible For Anyone
  Who Wants To Enhance Their Knowledge. Whether You're A Beginner Or An Experienced Professional, SkillBridge Has The Tools And 
  Resources To Help You Succeed. Join Thousands Of Learners Who Have Transformed Their Skills And Careers through SkillBridge.

  At SkillBridge, we pride ourselves on being a platform that fosters continuous learning and growth. Our community of learners
  and educators are passionate about their fields, and this shared enthusiasm creates a vibrant and motivating learning environment.
  We collaborate with renowned industry experts and leaders to ensure that our courses are not only relevant but also cutting-edge,
  allowing learners to stay ahead of industry trends.

  What makes SkillBridge stand out is our commitment to flexibility. We understand that learning at your own pace is crucial, and 
  that's why we offer courses that can be accessed anywhere, anytime. With a variety of formats including video lessons, quizzes, 
  assignments, and peer interactions, we cater to diverse learning styles and needs.

  Additionally, we believe in making education accessible to all. That's why our platform is affordable without compromising on 
  quality. Our goal is to eliminate barriers to learning, providing opportunities for individuals from all walks of life to enhance
  their skills and succeed in their chosen career paths. SkillBridge is not just about learning new skills; it's about transforming 
  your career and achieving your goals.`;

  const shortText = fullText.split(' ').slice(0, 50).join(' ') + '...';

  return (
    <div className="pt-20 px-4 md:px-0 bg-gradient-to-b from-indigo-200 to-white min-h-screen">
      <div className="container mx-auto text-center">
        <img
          src={webLogo}
          alt="SkillBridge Logo"
          width={96}
          height={80}
          className=" mx-auto mb-8"
          style={{ width: '200px', height: 'auto' }} 
        />
        <h1 className="text-[#324aad] text-3xl md:text-4xl font-bold relative inline-block pb-2.5 mb-6">
          About Skillbridge
          <span className="block w-32 h-0.5 bg-[#5c8bf5] mx-auto mt-2"></span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-start md:justify-between mb-12">
        <div className="w-full md:w-1/3 mb-8 md:mb-0 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#324aad]">Quick Facts</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#5c8bf5]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span><strong>Founded:</strong> 2020</span>
            </li>
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#5c8bf5]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <span><strong>Location:</strong> Ahmedabad, Gujarat, India</span>
            </li>
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#5c8bf5]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span><strong>Mission:</strong> Empower Learners To Achieve Career Success</span>
            </li>
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#5c8bf5]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span><strong>Values:</strong> Quality, Flexibility, Accessibility</span>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-2/3 md:pl-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 text-md mb-4">
              {isExpanded ? fullText : shortText}
            </p>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-center w-full bg-[#324aad] text-white py-2 px-4 rounded hover:bg-[#5c8bf5] transition duration-300"
            >
              {isExpanded ? (
                <>
                  Read Less 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </>
              ) : (
                <>
                  Read More 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;