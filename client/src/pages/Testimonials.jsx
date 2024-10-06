import React from 'react';
import Avatar1 from '../assets/Avatar1.svg';
import Avatar2 from '../assets/Avatar2.svg';
import Avatar3 from '../assets/Avatar3.svg';
import '../styles/Testimonials.css'
const testimonials = [
  {
    name: "— Sarah T.",
    text: "Skillbridge made learning new skills easy and fun. The course structure is clear and concise!",
    imgSrc: Avatar1, // Replace with actual image path
    bgColor: "#9aa7d5"
  },
  {
    name: "— Celia Almeda",
    text: "The platform's flexibility allowed me to study on my schedule, which was perfect for balancing work and learning.",
    imgSrc: Avatar2, // Replace with actual image path
    bgColor: "#9aa7d5"
  },
  {
    name: "— Bob Roberts",
    text: "Navigating the courses was a breeze, and the information provided was spot-on. A fantastic learning experience!",
    imgSrc: Avatar3, // Replace with actual image path
    bgColor: "#9aa7d5"
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
            className="testimonial"
            data-aos="fade-up"
            style={{ backgroundColor: testimonial.bgColor }}
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
