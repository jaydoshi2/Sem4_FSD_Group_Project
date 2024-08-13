import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Course.css';
import axios from 'axios';

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
        console.log(response);
    
        if (response.data.isAuthenticated) {
          setUser(response.data.user);
          localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user in local storage
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data", error);
        setIsAuthenticated(false);
      }
    };
    

    const fetchVariable = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8000/new_server_module/handle-api-keys/',
          { api_key: "apiKey" },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
    // fetchVariable();

    // Fetch courses data
    const fetchCourses = async () => {
      // Assuming you have an endpoint to get courses
      // const response = await axios.get('http://localhost:3000/courses');
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
      setCourses(courses);
    };

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

  const logout = () => {
    axios.post(`http://${myIP}:3000/auth/logout`, {}, { withCredentials: true })
      .then(() => {
        localStorage.removeItem('user');
        navigate('/Login');
      })
      .catch((error) => console.error("Logout failed", error));
  };

  if (loading) return <div> User is Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h1>Welcome, {user.first_name}!</h1>
          <img src={user.profilePic} alt="Profile" />
          <button className="logout-btn" onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/Login" className="login-btn">Login/Signup</Link>
      )}

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
};

export default Course;
