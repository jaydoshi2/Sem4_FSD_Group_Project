import React from 'react';
import Avatar1 from '../assets/Avatar1.svg';
import Avatar2 from '../assets/Avatar2.svg';
import Avatar3 from '../assets/Avatar3.svg';
import '../styles/Testimonials.css'
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
      <div className="container section-title text-center" data-aos="fade-up">
        <h2 className="styled-header">Testimonials</h2>
      </div>
      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="testimonial bg-indigo-300"
            data-aos="fade-up"
          >
            <img
              src={testimonial.imgSrc}
              alt="not found"
              className="testimonial-img"
            />
            <p className="testimonial-text">“{testimonial.text}”</p>
            <p className="testimonial-name">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Testimonials;
