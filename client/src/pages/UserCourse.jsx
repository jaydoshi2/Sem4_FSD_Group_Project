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

const RecommendedCourseCard = ({ course }) => {
  return (
    <div>
      <div>
        <h3>{course.course_name}</h3>
        <img src={course.thumbnail_pic_link} alt={course.course_name} />
        <p>{course.course_type}</p>
      </div>
    </div>
  );
};

const UserCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  useEffect(() => {
    const fetchUserCourses = async () => {
      const userId = JSON.parse(localStorage.getItem('user')).user_id;
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
      console.log(BACKEND_URL)

      try {
        const response = await axios.post(`${BACKEND_URL}/user/getusercourses`, {
          userId: userId
        });
        const enrolledCourses = response.data.map(course => course.course.title);
        const recResponse = await axios.post(`http://127.0.0.1:8000/course_recommendations/getrecommendations/`, {
          user_courses: enrolledCourses,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setRecommendations(recResponse.data.recommendations);
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
      <h1>Recommend Courses </h1>
      <div className="recommended-courses-list">
        {recommendations.map((course, index) => (
          <RecommendedCourseCard
            key={index}
            course={course}
          />
        ))}
      </div>
    </div>
  );
};

export default UserCoursesPage;