import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import React, { useContext, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeContext';
import '../styles/Course.css';

const Slider = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [courses, setCourses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardsToShow = 3;
  const myIP = import.meta.env.VITE_MY_IP
  useHotkeys('left', () => prevSlide());
  useHotkeys('right', () => nextSlide());

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log(myIP)
        const response = await fetch(`http://${myIP}:3000/course`, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Adjusted to 3000ms (3 seconds) for more practical interval
    return () => clearInterval(interval);
  }, [currentIndex, courses.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (courses.length - cardsToShow + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (courses.length - cardsToShow + 1)) % (courses.length - cardsToShow + 1));
  };

  if (loading) {
    return <div className="loader">Loading...</div>; // Customize your loader as needed
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>; // Display error message if any
  }

  return (
    <div>
      <div className="slider-container">
        <button className="theme-toggle-button btn btn-secondary position-absolute top-0 end-0 m-2" onClick={toggleTheme}>
          {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </button>
        <div className="position-relative">
          <div className="overflow-hidden">
            <div
              className="d-flex"
              style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`, transition: 'transform 0.5s ease' }}
            >
              {courses.map((course, index) => (
                <div key={index} className="col-4 p-2 flex-shrink-0">
                  <div className="card" style={{ height: '100%' }}>
                    <img src={course.thumbnail_pic_link} className="card-img-top p-3 rounded" alt={course.title} />
                    <div className="card-body">
                      <h5 className="card-title">{course.title}</h5>
                      <p className="card-text">{course.course_type}</p>
                      <button className='btn btn-primary'>View More</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn-secondary position-absolute top-50 start-0 translate-middle-y"
        onClick={prevSlide}
        style={{ zIndex: 1 }}
      >
        <FaArrowLeft />
      </button>
      <button
        className="btn btn-secondary position-absolute top-50 end-0 translate-middle-y"
        onClick={nextSlide}
        style={{ zIndex: 1 }}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Slider;