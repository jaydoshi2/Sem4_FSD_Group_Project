import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BookLoader from '../components/BookLoader';
import { BookOpen } from 'lucide-react';
// CourseCard Component

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
  const [noCourses, setNoCourses] = useState(false);
  const navigate = useNavigate();
  const myIP = import.meta.env.VITE_MY_IP;

  const resumeCourse = async (course) => {
    setLoading(true);
    const courseId = course.course_id;
    console.log("resuming", courseId);
    const response = await axios.get(`http://${myIP}:3000/from/first-chapter-video/${courseId}`);
    const data = response.data;
    if (response.status === 200) {
      const chapter_id = data.chapter_id;
      const video_id = data.video_id;
      navigate(`/video?course_id=${courseId}&chapter_id=${chapter_id}&video_id=${video_id}`);
      setLoading(false);
    } else {
      console.error('Error fetching chapter and video:', data.message);
    }
  };

  const viewCertificate = (course) => {
    // setLoading(true);
    // navigate(`/certificate/${course.course_id}`);
    // setLoading(false);
  };

  useEffect(() => {
    const fetchUserCourses = async () => {
      const userId = JSON.parse(localStorage.getItem('user')).userId;
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      try {
        const response = await axios.post(`${BACKEND_URL}/user/getusercourses`, { userId: userId });

        if (Array.isArray(response.data) && response.data.length > 0) {
          console.log("course : ", response.data);
          setCourses(response.data);
          setNoCourses(false);
        } else {
          console.warn('You have no purchases');
          setNoCourses(true);
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
      <div className="min-h-screen bg-indigo-50">
        {/* Header Section */}
        <div className="container mx-auto px-4 pt-20 pb-8">
          <h1 className="text-[#324aad] text-3xl md:text-4xl font-bold text-center mb-2">
            My Courses
            <span className="block w-24 h-1 bg-[#5c8bf5] mx-auto mt-2"></span>
          </h1>
        </div>

        {/* Main Content Section */}
        <div className="container mx-auto px-4">
          {noCourses ? (
            // Empty State
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-indigo-100  rounded-xl shadow-lg p-8 mx-auto max-w-2xl">
              <BookOpen className="w-20 h-20 text-indigo-500 mb-6" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                No Courses Yet
              </h2>
              <p className="text-gray-600 text-center mb-8 max-w-md">
                You haven't purchased any courses yet. Explore our catalog to find courses
                that match your interests and start your learning journey.
              </p>
              <button
                onClick={() => navigate('/course')}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-4 transition-all duration-500 ease-in-out">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-indigo-950 shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 transform flex flex-col h-full"
                >
                  <div className="h-40 sm:h-48 flex justify-center items-center overflow-hidden p-2">
                    <img
                      src={course.course.thumbnail_pic_link}
                      alt={course.course.title}
                      className="h-full w-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h5 className="text-lg sm:text-xl font-semibold mb-3 text-[#0F306D] line-clamp-2">{course.course.title}</h5>
                    <p className="text-gray-500 mb-2">{course.completed_course}% completed</p>
                    <div className="w-full bg-gray-300 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${course.completed_course}%` }}
                      ></div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      {course.completed_course === 100 ? (
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={() => resumeCourse(course.course)}>
                          Course Completed
                        </button>
                      ) : (
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => resumeCourse(course.course)}>
                          Resume
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recommendations Section */}
          <div className="bg-indigo-50 mt-12 mb-8">
          <div className="container mx-auto px-4 pt-20 pb-8">
            <h1 className="text-[#324aad] text-3xl md:text-4xl font-bold text-center mb-2">
              Recommend Courses
              <span className="block w-48 h-1 bg-[#5c8bf5] mx-auto mt-2"></span>
            </h1>
          </div>
            {recommendations.length > 0 ? (
            <div className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar">
                {recommendations.map((course, index) => (
                  <RecommendedCourseCard key={index} course={course} />
                ))}
              </div>
            ) : (
              <div className="bg-indigo-100 rounded-xl p-8 text-center shadow-md">
                <p className="text-gray-600 mb-2">
                  No recommendations available at the moment.
                </p>
                <p className="text-gray-500">
                  Check back later for personalized course suggestions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

export default UserCoursesPage;
