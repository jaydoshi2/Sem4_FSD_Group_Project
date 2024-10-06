import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Course.css';
import BookLoader from '../components/BookLoader';

const Course = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const myIP = import.meta.env.VITE_MY_IP;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://${myIP}:3000/auth/check-auth`, {
          withCredentials: true
        });
        if (response.data.isAuthenticated) {
          setUser(response.data.user);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          setIsAuthenticated(true);
        } else {
          const userData = localStorage.getItem('user');
          if (!userData) {
            setIsAuthenticated(false);
            navigate('/');  // Redirect to login if no user data
          } else {
            setUser(JSON.parse(userData));
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        setIsAuthenticated(false);
        navigate('/');  // Redirect to login on error
      }
    };

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://${myIP}:3000/course`);
        if (response.data) {
          setCourses(response.data);
        }
      } catch (error) {
        console.error("Error fetching courses data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchCourses();
  }, [navigate, myIP]);

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

  const handleCardClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const logout = () => {
    axios.post(`http://${myIP}:3000/auth/logout`, {}, { withCredentials: true })
      .then(() => {
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        navigate('/');
      })
      .catch((error) => console.error("Logout failed", error));
  };

  if (loading) return <BookLoader/>;

  return (
    <div className="course-page">
      <header className="user-info">
        {isAuthenticated && user ? (
          <>
            <h1>Welcome, {user.first_name}!</h1>
            <p>Email: {user.email}</p>
            <img className='user-info_img' src={user.profilePic} alt="Profile" style={{width: 100, height: 100}} />
            <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-btn">Login/Signup</Link>
        )}
      </header>
      
      {/* <div className="carousel-container">
        <button className="prev-btn" onClick={handlePrevious}>‹</button>
        <div className="slider-container" ref={carouselRef}>
          <div className="card-container">
            {courses.map((course, index) => (
              <div
                className="course-card"
                key={index}
                onClick={() => handleCardClick(course.course_id)}
              >
                <div className="card-image">
                  <img src={course.thumbnail_pic_link} alt={course.title} />
                </div>
                <div className="card-content">
                  <h2>{course.title}</h2>
                  <p>{course.course_type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="next-btn" onClick={handleNext}>›</button>
      </div> */}
    </div>
  );
};

export default Course;