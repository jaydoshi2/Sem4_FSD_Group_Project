import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserCourse.css'
const CourseCard = ({ course, completedPercentage }) => {
  return (
    <div>
      <h3>{course.title}</h3>
      <img src={course.thumbnail_pic_link} alt={course.title} />
      <p>{completedPercentage}% completed</p>
      {completedPercentage === 100 ? (
        <button>View Certificate</button>
      ) : (
        <button>Resume</button>
      )}
    </div>
  );
};

const UserCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCourses = async () => {
      const userId = JSON.parse(localStorage.getItem('user')).user_id;
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
      console.log(BACKEND_URL)
      
      try {
        const response = await axios.post(`${BACKEND_URL}/user/getusercourses`, {
          userId: userId
        });
        setCourses(response.data);
        setLoading(false);
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
      {courses.map((courseData, index) => (
        <CourseCard
          key={index}
          course={courseData.course}
          completedPercentage={courseData.completed_course}
        />
      ))}
    </div>
  );
};

export default UserCoursesPage;