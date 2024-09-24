import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserCourse.css';
import BookLoader from '../components/BookLoader';

// CourseCard Component
const CourseCard = ({ course, completedPercentage }) => {
  if (!course) {
    return <div>Error: Course data is missing.</div>; // Handle missing course data
  }

  console.log("Rendering CourseCard for", course.title); // Debugging log

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full md:w-1/2 lg:w-1/3">
      <h3 className="text-xl font-bold mb-2">{course.title}</h3>
      <img
        src={course.thumbnail_pic_link}
        alt={course.title}
        className="w-full h-40 object-cover rounded-lg mb-2"
      />
      <p className="text-gray-500 mb-2">{completedPercentage}% completed</p>
      <div className="w-full bg-gray-300 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${completedPercentage}%` }}
        ></div>
      </div>
      <div className="mt-4">
        {completedPercentage === 100 ? (
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
            View Certificate
          </button>
        ) : (
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Resume
          </button>
        )}
      </div>
    </div>
  );
};

// RecommendedCourseCard Component (stub, adjust as needed)
const RecommendedCourseCard = ({ course }) => {
  if (!course) {
    return <div>Error: Recommended course data is missing.</div>;
  }

  return (
    <div className="bg-gray-200 p-4 rounded-lg w-full md:w-1/2 lg:w-1/3">
      <h3 className="text-lg font-bold mb-2">{course.title}</h3>
      {/* Add more fields as needed */}
    </div>
  );
};

// UserCoursesPage Component
const UserCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchUserCourses = async () => {
      const userId = JSON.parse(localStorage.getItem('user')).user_id;
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

      try {
        const response = await axios.post(`${BACKEND_URL}/user/getusercourses`, {
          userId: userId,
        });

        console.log('Response data from API:', response.data); // Check if data is as expected

        // Check if the response data is an array and contains course information
        if (Array.isArray(response.data) && response.data.length > 0) {
          setCourses(response.data); // Set the state only if response contains valid data
        } else {
          console.warn('No courses data available');
        }

        // Fetch recommendations based on enrolled courses
        const enrolledCourses = response.data.map((course) => course.course.title);
        const recResponse = await axios.post(`http://127.0.0.1:8000/course_recommendations/getrecommendations/`, {
          user_courses: enrolledCourses,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setRecommendations(recResponse.data.recommendations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user courses:', error);
        setLoading(false);
      }
    };

    fetchUserCourses();
  }, []);

  if (loading) {
    return <div><BookLoader/></div>;
  }

  console.log('Rendering courses:', courses); // Debugging log to see the courses array

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>

      <div className="flex flex-wrap gap-4">
        {courses.length > 0 ? (
          courses.map((courseData, index) => (
            <CourseCard
              key={index}
              course={courseData.course}
              completedPercentage={courseData.completed_course}
            />
          ))
        ) : (
          <p>No courses available</p>
        )}
      </div>

      <h1 className="text-3xl font-bold mb-6">Recommended Courses</h1>
      <div className="recommended-courses-list flex flex-wrap gap-4">
        {recommendations.length > 0 ? (
          recommendations.map((course, index) => (
            <RecommendedCourseCard key={index} course={course} />
          ))
        ) : (
          <p>No recommendations available</p>
        )}
      </div>
    </div>
  );
};

export default UserCoursesPage;
