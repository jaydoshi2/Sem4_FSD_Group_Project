import React from 'react';
import '../styles/Home.css';
import TP1 from '../assets/images/profile.png';

const testimonials = [
  {
    name: "— Sarah T.",
    text: "Skillbridge made learning new skills easy and fun. The course structure is clear and concise!",
    imgSrc: {TP1}, // Replace with actual image path
    bgColor: "#9aa7d5"
  },
  {
    name: "— Celia Almeda",
    text: "The platform's flexibility allowed me to study on my schedule, which was perfect for balancing work and learning.",
    imgSrc: {TP1}, // Replace with actual image path
    bgColor: "#9aa7d5"
  },
  {
    name: "— Bob Roberts",
    text: "Navigating the courses was a breeze, and the information provided was spot-on. A fantastic learning experience!",
    imgSrc: {TP1}, // Replace with actual image path
    bgColor: "#9aa7d5"
  }
];

const Testimonials = () => {
  return (
    <div>
      <section id="testimonials" className="testimonials section" />
      <div className="container section-title" data-aos="fade-up">
        <h2>Testimonials</h2>
      </div>
      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial" data-aos="fade-up" style={{ backgroundColor: testimonial.bgColor }}>
            {/* <img src={testimonial.imgSrc} alt={testimonial.name} className="testimonial-img" /> */}
            <img src={TP1} alt={testimonial.name} className="testimonial-img" />
            <p className="testimonial-text">“{testimonial.text}”</p>
            <p className="testimonial-name">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
