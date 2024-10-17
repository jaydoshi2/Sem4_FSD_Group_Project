import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { getCSRFToken } from '../utils/csrfToken';
import '../styles/UserCourse.css'

const CourseCard = ({ course }) => {
  return (
    <div>
      <h3>{course.course_name}</h3>
      <img src={course.thumbnail_pic_link} alt={course.course_name} />
      <p>{course.course_type}</p>
    </div>
  );
};

const UserCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  function getCSRFToken() {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      console.log("True")
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Check if this cookie is the CSRF token
        if (cookie.substring(0, 10) === 'csrftoken=') {
          cookieValue = decodeURIComponent(cookie.substring(10));
          console.log("decoded cookie value ", cookieValue)
          break;
        }else{
          console.log(false)
        }
      }
    }else{
     console.log("FIRST IF FALSE ")   
    }
    console.log("cookie Value",cookieValue)
    return cookieValue;
  }
  useEffect(() => {
    const fetchUserCourses = async () => {
      const userId = JSON.parse(localStorage.getItem('user')).user_id;
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

      const csrfToken = getCSRFToken(); // Get the CSRF token
      console.log(csrfToken)
      try {
        const response = await axios.post(`${BACKEND_URL}/user/getusercourses`, {
          userId: userId,
        });
        setCourses(response.data);
        setLoading(false);

        const enrolledCourses = response.data.map(course => course.course.title);
        const recResponse = await axios.post(`http://${import.meta.env.VITE_MY_IP}:8000/course_recommendations/getrecommendations/`, {
          user_courses: enrolledCourses,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setRecommendations(recResponse.data.recommendations);
      } catch (error) {
        console.error('Error fetching user courses:', error);
        setLoading(false);
      }
    };

    fetchUserCourses();
  }, []);

  if (loading) {
    return <div>Loading courses...</div>;
  }

  return (
    <div>
      <h1>My Courses</h1>
      <div>
        {courses.map((courseData, index) => (
          <CourseCard key={index} course={courseData.course} />
        ))}
      </div>

      <h2>Recommended Courses</h2>
      <div>
        {recommendations.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default UserCoursesPage;