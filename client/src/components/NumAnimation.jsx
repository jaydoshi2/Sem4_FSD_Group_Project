import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import React from "react";
import AnimatedNumbers from "react-animated-numbers";

function NumAnimation() {
  React.useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  const numbers = [352455, 408546, 930545];
  const labels = ["Courses", "Learners", "Expert Faculties"];

  return (
    <div id="num-animation" className="flex justify-center items-center gap-20 p-8 flex-wrap">
      {numbers.map((num, index) => (
        <div key={index} className="inline-block m-4 text-center">
          <div className="flex justify-center items-center">
            <AnimatedNumbers
              includeComma
              animateToNumber={num}
              className="text-[#324aad]"
              fontStyle={{
                fontSize: "3rem",
              }}
              transitions={(index) => ({
                type: "spring",
                duration: index *0.5,
              })}
            />
            <span className="text-3xl font-bold text-[#324aad] ml-2">+</span>
          </div>
          <p
            className="text-[#324aad] font-bold mt-2 text-3xl"
          >
            {labels[index]}
          </p>
        </div>
      ))}
    </div>
  );
}

export default NumAnimation;
