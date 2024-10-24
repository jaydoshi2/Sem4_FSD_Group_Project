import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/UserCourse.css';
import BookLoader from '../components/BookLoader';

// CourseCard Component
const CourseCard = ({ course, completedPercentage }) => {
  const navigate = useNavigate();
  const myIP = import.meta.env.VITE_MY_IP;
  if (!course) {
    return <div>Error: Course data is missing.</div>;
  }
  const resumeCourse = async (course) => {

    const courseId = course.course_id
    console.log(courseId)
    const response = await axios.get(`http://${myIP}:3000/from/first-chapter-video/${courseId}`);
    const data = response.data;
    if (response.status === 200) {
      const chapter_id = data.chapter_id;
      const video_id = data.video_id;
      navigate(`/video?course_id=${courseId}&chapter_id=${chapter_id}&video_id=${video_id}`);
    } else {
      console.error('Error fetching chapter and video:', data.message);
    }
  }
  const viewCertificate = (course) => {

  }

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
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={viewCertificate(course)}>
            View Certificate
          </button>
        ) : (
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={()=>{resumeCourse(course)}}>
            Resume
          </button>
        )}
      </div>
    </div>
  );
};

// RecommendedCourseCard Component
const RecommendedCourseCard = ({ course }) => {
  if (!course) {
    return <div>Error: Recommended course data is missing.</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-72 flex-shrink-0">
      <h3 className="text-lg font-bold mb-2">{course.course_name}</h3>
      <img
        src={course.thumbnail_pic_link}
        alt={course.course_name}
        className="w-full h-40 object-cover rounded-lg mb-2"
      />
      <p className="text-gray-500 mb-2">{course.course_type}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Learn More
      </button>
    </div>
  );
};

// UserCoursesPage Component
const UserCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const myIP = import.meta.env.VITE_MY_IP;
  console.log(courses)
  useEffect(() => {
    const fetchUserCourses = async () => {
      var userId = JSON.parse(localStorage.getItem('user')).userId;
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

      try {
        const response = await axios.post(`${BACKEND_URL}/user/getusercourses`, {
          userId: userId,
        });

        if (Array.isArray(response.data) && response.data.length > 0) {
          setCourses(response.data);
        } else {
          console.warn('You have no purchases');
        }

        // Fetch recommendations based on enrolled courses
        const enrolledCourses = response.data.map((course) => ({
          title: course.course.title,
          description: course.course.description,
        }));
        const recResponse = await axios.post(
          `http://${myIP}:8000/course_recommendations/getrecommendations/`,
          { user_courses: enrolledCourses },
          { headers: { 'Content-Type': 'application/json' } }
        );

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
    return <div><BookLoader /></div>;
  }

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
          <p>You have No Purchased Courses</p>
        )}
      </div>

      <h1 className="text-3xl font-bold mb-6">Recommended Courses</h1>
      {/* Horizontal Scroll for Recommended Courses */}
      <div className="recommended-courses-list flex overflow-x-auto space-x-4 pb-4">
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