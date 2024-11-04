import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SkeletonLoader from '../components/SkeletonLoader'; // Import the skeleton loader
import SubNavbar from '../components/SubNavbar';
import BookLoader from '../components/BookLoader';

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
  const [loading1, setLoading1] = useState(false); // State to track loading status
  const [courseData, setCourseData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const navigate = useNavigate(); // Initialize useNavigate
  const [searchParams] = useSearchParams(); // Get the query parameters
  const courseType = searchParams.get("course_type"); // Get the course_type from query params
  const myIP = import.meta.env.VITE_MY_IP;

  const fetchCourseData = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if(userData !=null){
      const userId = userData.userId;
      axios.post(`http://${myIP}:3000/course/getall`, { userId })
  
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
    }else{
      axios.post(`http://${myIP}:3000/course/getall`)
  
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
    }
   
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseType]); // Refetch when courseType changes


  const handleReadMoreClick = (course) => {
    setLoading1(true)
    navigate(`/courseDetails?course_id=${course.course_id}`);
    setLoading1(false)
  };

  const resumeCourse = async (course) => {
    setLoading1(true)
    const courseId = course.course_id
    console.log("resuming", courseId)
    const response = await axios.get(`http://${myIP}:3000/from/first-chapter-video/${courseId}`);
    const data = response.data;
    if (response.status === 200) {
      const chapter_id = data.chapter_id;
      const video_id = data.video_id;
      navigate(`/video?course_id=${courseId}&chapter_id=${chapter_id}&video_id=${video_id}`);
      setLoading1(false)
    } else {
      console.error('Error fetching chapter and video:', data.message);
    }
  }
  const viewCertificate = (course) => {
    setLoading1(true)
    navigate(`/certificate/${course.course_id}`)
    setLoading1(false)
  }
  if (loading1) {
    return (<BookLoader />)
  }  // Calculate the courses to display on the current page
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;
  const currentCourses = courseData.slice(startIndex, endIndex);

  // Calculate total pages based on the number of courses
  const totalPages = Math.ceil(courseData.length / CARDS_PER_PAGE);

  return (
    <div className="flex flex-col min-h-screen bg-indigo-100">
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
            <fieldset className="mb-8 border border-indigo-900 rounded-lg p-6 bg-indigo-50">
              <legend className="text-2xl font-bold text-indigo-900 px-3 py-1 rounded-md ">
                {courseType} Courses
              </legend>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 transition-all duration-500 ease-in-out '>
                {currentCourses.map((course, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-[#D9E6F5] shadow-md text-center overflow-hidden transition-transform transform hover:scale-105 duration-300 hover:shadow-xl"
                  >
                    <div className="h-48 rounded-t-lg flex justify-center items-center overflow-hidden p-2">
                      <img
                        src={course.thumbnail_pic_link}
                        alt={course.title}
                        className="h-full w-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h5 className="text-lg sm:text-xl font-semibold mb-3 text-[#0F306D] line-clamp-2">{course.title}</h5>
                      <div className="mt-auto flex justify-center">
                        {!course.purchased ? (
                          <button
                            className="bg-[#1A73E8] text-white py-2 px-4 rounded hover:bg-[#1558B1] transition-colors duration-300"
                            onClick={() => handleReadMoreClick(course)}
                          >
                            Read More
                          </button>
                        ) : course.completed_course === 100 ? (
                          <button
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"
                            onClick={() => viewCertificate(course)}
                          >
                            Download Certificate
                          </button>
                        ) : (
                          <button
                            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors duration-300"
                            onClick={() => resumeCourse(course)}
                          >
                            Resume
                          </button>
                        )}
                      </div>
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
