import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Make sure you have axios installed
import BookLoader from '../components/BookLoader';

function CourseDetail() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get('course_id');
  console.log(courseId)
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const myIP = import.meta.env.VITE_MY_IP;
  
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Replace with your actual API URL
        const response = await axios.get(`http://${myIP}:3000/course/${courseId}`);
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching course details:', err);
        setError('Failed to load course details');
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) return <BookLoader/>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center py-4 border-b">
        <div className="flex items-center space-x-2">
          <img
            src="https://path-to-your-logo.com/logo.png" // Replace with your logo URL
            alt="LJ University"
            className="h-10"
          />
          <span className="text-xl font-semibold text-blue-900">LJ University</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="text-blue-700">English</a>
          <div className="relative">
            <button className="flex items-center space-x-1">
              <span className="text-white bg-blue-900 p-2 rounded-full">T</span>
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 py-4">
        <a href="#" className="hover:underline">Data Science</a> &gt;{' '}
        <a href="#" className="hover:underline">Machine Learning</a>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {course.title}
        </h1>
        <div className="flex items-center space-x-4 mb-6">
          <button className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg">
            Enroll Starts Aug 25
          </button>
          <p className="text-sm text-gray-500">Sponsored by Lok Jagruti University</p>
        </div>
        <p className="text-lg text-gray-700 mb-6">6,008 already enrolled</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center border-r pr-4">
            <a href="#" className="text-blue-600 font-bold text-lg hover:underline">
              4 modules
            </a>
            <p className="text-gray-500 text-sm mt-1">
              Gain insight into a topic and learn the fundamentals.
            </p>
          </div>
          <div className="text-center border-r pr-4">
            <p className="text-2xl font-bold text-gray-900">4.8 ★</p>
            <p className="text-gray-500 text-sm mt-1">(58 reviews)</p>
          </div>
          <div className="text-center border-r pr-4">
            <p className="text-2xl font-bold text-gray-900">3 hours to complete</p>
            <p className="text-gray-500 text-sm mt-1">
              3 weeks at 1 hour a week
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">Flexible schedule</p>
            <p className="text-gray-500 text-sm mt-1">Learn at your own pace</p>
          </div>
        </div>

        {/* Display course details */}
        <div className="mt-8">
          <img src={course.thumbnail_pic_link} alt={course.title} className="w-full h-auto mb-4" />
          <p className="text-lg text-gray-700 mb-4"><strong>Description:</strong> {course.description}</p>
          <p className="text-lg text-gray-700 mb-4"><strong>Price:</strong> ${course.price}</p>
          <p className="text-lg text-gray-700 mb-4"><strong>Enrollment Count:</strong> {course.Enrollment_Counts}</p>
          <p className="text-lg text-gray-700 mb-4"><strong>Certificate Preview:</strong> <a href={course.certificate_preview_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></p>
          <p className="text-lg text-gray-700 mb-4"><strong>Course Type:</strong> {course.course_type}</p>
          <p className="text-lg text-gray-700 mb-4"><strong>Points Providing:</strong> {course.points_providing}</p>
          <p className="text-lg text-gray-700 mb-4"><strong>Rate:</strong> {course.Rate}</p>
          <p className="text-lg text-gray-700 mb-4"><strong>Course Level:</strong> {course.course_level}</p>
          <p className="text-lg text-gray-700 mb-4"><strong>Number of Ratings:</strong> {course.number_of_ratings}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
