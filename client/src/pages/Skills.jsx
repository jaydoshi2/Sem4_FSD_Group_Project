import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SkeletonLoader from '../components/SkeletonLoader'; // Import the skeleton loader
import SubNavbar from '../components/SubNavbar';

const CARDS_PER_PAGE = 12; // Variable to control the number of cards per page

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const Skills = () => {
  const [loading, setLoading] = useState(true); // State to track loading status
  const [courseData, setCourseData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const navigate = useNavigate(); // Initialize useNavigate
  const [searchParams] = useSearchParams(); // Get the query parameters
  const courseType = searchParams.get("course_type"); // Get the course_type from query params

  const fetchCourseData = () => {
    axios
      .get("http://localhost:3000/course/getall")

      .then((response) => {
        const fetchedData = response.data;

        // Filter courses by course_type
        const filteredCourses = fetchedData.filter(
          (course) => course.course_type === courseType
        );

        // Shuffle the filtered courses
        const shuffledCourses = shuffleArray(filteredCourses);

        setCourseData(shuffledCourses);
        setLoading(false); // Data has been fetched, so stop loading
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
        setLoading(false); // Even on error, stop loading
      });
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseType]); // Refetch when courseType changes

  const handleReadMoreClick = (course) => {
    // Navigate to the desired URL with the course ID
    navigate(`/courseDetails?course_id=${course.course_id}&coursename=${course.title}`);

  };

  // Calculate the courses to display on the current page
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;
  const currentCourses = courseData.slice(startIndex, endIndex);

  // Calculate total pages based on the number of courses
  const totalPages = Math.ceil(courseData.length / CARDS_PER_PAGE);

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F7FD]">
      <SubNavbar />
      <div className="flex-grow flex-grow pt-32 pb-8 px-4">
          {loading ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(8).fill().map((_, index) => (
                <SkeletonLoader key={index} />
              ))}
            </div>
          ) : currentCourses.length > 0 ? (
            <>
              <fieldset className="mb-8 border-2 border-gray-300 rounded-lg p-4">
                <legend className="text-2xl font-bold text-[#1e3a8a] px-2 py-1 rounded-md">
                  {courseType} Courses
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                  {currentCourses.map((course, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg border-3 border-gray-250 shadow-lg text-center overflow-hidden transition-all duration-500"
                    >
                      <div className="h-48 rounded-t-lg flex justify-center items-center overflow-hidden p-2">
                        <img
                          src={course.thumbnail_pic_link}
                          alt={course.title}
                          className="h-full w-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="p-2">
                        <h5 className="text-xl text-[#1e3a8a] font-semibold mb-3">{course.title}</h5>
                        <button
                          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                          onClick={() => handleReadMoreClick(course)}
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="flex justify-center mt-8 mb-4">
                <button
                  className="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400 flex items-center justify-center"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="fa-solid fa-angles-left"></i>
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400 flex items-center justify-center"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <i className="fa-solid fa-angles-right"></i>
                </button>
              </div>
            </>
          ) : (
            <p>No courses found for the selected category.</p>
          )}
        </div>
    </div>
  );
};

export default Skills
