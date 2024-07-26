import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef } from 'react';
import '../Styles/Course.css';

function App() {
  const carouselRef = useRef(null);

  const courses = [
    {
      course_name: "Introduction to Computer Science",
      course_image: "http://books.google.com/books/content?id=D9VEIQAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      course_type: "Computer Science"
    },
    {
      course_name: "Data Structures and Algorithms",
      course_image: "http://books.google.com/books/content?id=dsVGAAAAMAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      course_type: "Data Structure"
    },
    {
      course_name: "Business Management Basics",
      course_image: "http://books.google.com/books/content?id=BMENAAAAYAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      course_type: "Business"
    },
    {
      course_name: "Advanced Data Science",
      course_image: "http://books.google.com/books/content?id=ASENAAAAYAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      course_type: "Data Science"
    },
    {
      course_name: "Advanced Data Science",
      course_image: "http://books.google.com/books/content?id=ASENAAAAYAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      course_type: "Data Science"
    },
    {
      course_name: "Advanced Data Science",
      course_image: "http://books.google.com/books/content?id=ASENAAAAYAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      course_type: "Data Science"
    },
    {
      course_name: "Advanced Data Science",
      course_image: "http://books.google.com/books/content?id=ASENAAAAYAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      course_type: "Data Science"
    },
    {
      course_name: "Advanced Data Science",
      course_image: "http://books.google.com/books/content?id=ASENAAAAYAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      course_type: "Data Science"
    },
    {
      course_name: "Marketing 101",
      course_image: "http://books.google.com/books/content?id=MAENAAAAYAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      course_type: "Business"
    }
  ];

  const handlePrevious = () => {
    carouselRef.current.scrollBy({
      left: -carouselRef.current.offsetWidth,
      behavior: 'smooth'
    });
  };

  const handleNext = () => {
    carouselRef.current.scrollBy({
      left: carouselRef.current.offsetWidth,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <br /><br /><br />
        <button className="prev-btn" onClick={handlePrevious}>Previous</button>
      <div className="slider-container">
        <div className="card-container" ref={carouselRef}>
          {courses.map((course, index) => (
            <div className="course-card" key={index}>
              <div className="card-image">
                <img src={course.course_image} alt={course.course_name} />
              </div>
              <div>{course.course_name}</div>
              <div>{course.course_type}</div>
            </div>
          ))}
        </div>
      </div>
        <button className="next-btn" onClick={handleNext}>Next</button>
    </div>
  );
}

export default App;
