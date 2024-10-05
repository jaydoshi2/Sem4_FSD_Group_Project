import React from "react";
import AnimatedNumbers from "react-animated-numbers";
import '../styles/Home.css'; // Importing the global CSS file

function NumAnimation() {
  const numbers = [352455, 408546, 930545];
  const labels = ["Courses", "Learners", "Expert Faculties"];

  return (
    <div className="num-animation-container1" id="num-animation">
      {numbers.map((num, index) => (
        <div key={index} className="num-animation-container2" data-aos="fade-up">
          <AnimatedNumbers
            includeComma
            animateToNumber={num}
            className="animated-number"
            fontStyle={{
              fontSize: "3rem",
            }}
            transitions={(index) => ({
              type: "spring",
              duration: index * 1.5,
            })}
          />
          <p className="number-label" data-aos="fade-up">{labels[index]}</p>
        </div>
      ))}
    </div>
  );
}

export default NumAnimation;

