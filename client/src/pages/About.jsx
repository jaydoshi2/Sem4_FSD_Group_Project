import React from 'react';

const About = () => {
  // Full text for the "About" section with additional content
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
  your career and achieving your goals.`

  return (
    <div className="pt-60 px-4 md:px-0 bg-indigo-200 min-h-screen">
      <div className="container mx-auto text-center">
        <h1 className="text-[#324aad] text-3xl md:text-4xl font-bold relative inline-block pb-2.5 mb-6">
          About Skillbridge
          <span className="block w-32 h-0.5 bg-[#5c8bf5] mx-auto mt-2"></span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-start md:justify-between">
        {/* Left side Static Data */}
        <div className="w-full md:w-1/3 flex flex-col justify-center items-start p-4 md:p-6">
          {/* Static Data */}
          <p className="text-gray-700 text-lg mb-2"><strong>Founded:</strong> 2020</p>
          <p className="text-gray-700 text-lg mb-2"><strong>Location:</strong> Ahmedabad, Gujarat, India</p>
          <p className="text-gray-700 text-lg mb-2"><strong>Mission:</strong> Empower Learners To Achieve Career Success</p>
          <p className="text-gray-700 text-lg"><strong>Values:</strong> Quality, Flexibility, Accessibility</p>
        </div>

        {/* Right side full text */}
        <div className="w-full md:w-2/3 md:pl-8 flex flex-col md:flex-row items-center md:items-start justify-center">
          <div className="w-full">
            <p className="text-gray-700 text-md mb-4 text-center md:text-left">
              {fullText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
