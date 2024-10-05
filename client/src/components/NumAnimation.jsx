import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import React from "react";
import AnimatedNumbers from "react-animated-numbers";
import '../styles/NumAnimation.css'

function NumAnimation() {
  React.useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  const numbers = [352455, 408546, 930545];
  const labels = ["Courses", "Learners", "Expert Faculties"];

  return (
    <div id="num-animation">
      {numbers.map((num, index) => (
        <div key={index} className="num-animation-container2" data-aos="fade-up">
          <AnimatedNumbers
            includeComma
            animateToNumber={num}
            className="animated-number text-[#324aad]"
            fontStyle={{
              fontSize: "3rem",
            }}
            transitions={(index) => ({
              type: "spring",
              duration: index * 1.5,
            })}
          />
          <p className="number-label text-[#324aad] font-bold" data-aos="fade-up">{labels[index]}</p>
        </div>
      ))}
    </div>
  );
}

export default NumAnimation;
