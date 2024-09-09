import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Course.css';

const Course = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const myIP = import.meta.env.VITE_MY_IP;

  useEffect(() => {
    var global_response;
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://${myIP}:3000/auth/check-auth`, {
          withCredentials: true
        });
        global_response = response.data
        if (response.data.isAuthenticated) {
          setUser(response.data.user);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false)
        }
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching user data", error);
        setIsAuthenticated(false);
      }
    };

    const fetchCourses = async () => {
      try {
        setLoading(true);
        // console.log(global_response) 
        const response = await axios.get(`http://${myIP}:3000/course`);
        console.log(response.data)
        if (response) {
          setLoading(false);
          setCourses(response.data);
        }
        // console.log(courses);
      } catch (error) {
        console.error("Error fetching courses data", error);
      }
    };

    fetchUserData();
    fetchCourses();
  }, [navigate]);

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
    console.log(courseId)
    navigate(`/course/${courseId}`);
  };

  const logout = () => {
    axios.post(`http://${myIP}:3000/auth/logout`, {}, { withCredentials: true })
      .then(() => {
        localStorage.removeItem('user');
        navigate('/Login');
      })
      .catch((error) => console.error("Logout failed", error));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h1>Welcome, {user.first_name}!</h1>
          <img className='user-info_img' src={user.profilePic} alt="Profile" />
          <button className="logout-btn" onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/Login" className="login-btn">Login/Signup</Link>
      )}

      <div className="carousel-container">
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
      </div>
    </div>
  );
};

export default Course;
 