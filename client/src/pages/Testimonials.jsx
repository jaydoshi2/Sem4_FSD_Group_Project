import React from 'react';
import Avatar1 from '../assets/Avatar1.svg';
import Avatar2 from '../assets/Avatar2.svg';
import Avatar3 from '../assets/Avatar3.svg';

const testimonials = [
  {
    name: "— Archan Patel",
    text: "Skillbridge Made Learning New Skills Easy And Fun. The Course Structure Is Clear And Concise!",
    imgSrc: Avatar1, // Replace with actual image path
  },
  {
    name: "— Kavya Trivedi",
    text: "The Platform's Flexibility Allowed Me To Study On My Schedule, Which Was Perfect For Balancing Work And Learning.",
    imgSrc: Avatar2, // Replace with actual image path
  },
  {
    name: "— Jay Pandya",
    text: "Navigating The courses Was A Breeze, And The Information Provided Was Spot-On. A Fantastic Learning Experience!",
    imgSrc: Avatar3, // Replace with actual image path
  }
];

const Testimonials = () => {
  return (
    <div>
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#324aad] relative inline-block pb-2">
          Testimonials
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-[3px] bg-[#5c8bf5]"></span>
        </h2>
      </div>
      <div className="flex flex-col gap-5 p-5 px-12 mt-20">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex items-center p-5 rounded-lg shadow-md bg-indigo-300 md:flex-row flex-col md:items-start"
          >
            <img
              src={testimonial.imgSrc}
              alt="testimonial avatar"
              className="rounded-full w-32 h-32 mb-4 md:mb-0 md:mr-5"
            />
            <div className="text-center md:text-left">
              <p className="text-lg mb-2">“{testimonial.text}”</p>
              <p className="font-bold text-xl text-gray-800">{testimonial.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
