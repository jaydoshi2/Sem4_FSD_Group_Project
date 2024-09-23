import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubNavbar from '../components/SubNavbar';
import SkeletonLoader from '../components/SkeletonLoader'; // Import the skeleton loader

// Helper function to group courses by category
const initialDisplayCount = 4;
const incrementDisplayCount = 4;

const groupCoursesByCategory = (courses) => {
  return courses.reduce((acc, course) => {
    if (!acc[course.course_type]) {
      acc[course.course_type] = [];
    }
    acc[course.course_type].push(course);
    return acc;
  }, {});
};

// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomCategories = (categories) => {
  const keys = Object.keys(categories);
  const randomKeys = [];
  while (randomKeys.length < 2 && keys.length > 0) {
    const randomIndex = Math.floor(Math.random() * keys.length);
    if (!randomKeys.includes(keys[randomIndex])) {
      randomKeys.push(keys[randomIndex]);
    }
  }
  return randomKeys;
};

const CourseDisplay = () => {
  const [loading, setLoading] = useState(true); // State to track loading status
  const [course_data, setCourse_data] = useState([]);
  const [coursesByCategory, setCoursesByCategory] = useState({});
  const [randomCategories, setRandomCategories] = useState([]);
  const [displayCounts, setDisplayCounts] = useState({}); // State to manage displayed courses
  const [showMore, setShowMore] = useState({}); // State to track show more/less
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchCourseData = () => {
    axios.get("http://localhost:3005/course")
      .then((response) => {
        const fetchedData = response.data;

        // Shuffle the courses within each category
        const groupedCourses = groupCoursesByCategory(fetchedData);
        const shuffledCoursesByCategory = {};
        for (const category in groupedCourses) {
          shuffledCoursesByCategory[category] = shuffleArray(groupedCourses[category]);
        }

        setCourse_data(shuffledCoursesByCategory);
        setLoading(false); // Data has been fetched, so stop loading
      })
      .catch((error) => {
        console.error('Error fetching course data:', error);
        setLoading(false); // Even on error, stop loading
      });
  };

  useEffect(() => {
    fetchCourseData();
  }, []); // Fetch course data only once

  useEffect(() => {
    if (Object.keys(course_data).length > 0) {
      // Get two random categories
      const randomCats = getRandomCategories(course_data);
      setRandomCategories(randomCats);

      // Initialize display counts and showMore states for each category
      const initialCounts = randomCats.reduce((acc, category) => {
        acc[category] = initialDisplayCount;
        return acc;
      }, {});
      setDisplayCounts(initialCounts);

      const initialShowMore = randomCats.reduce((acc, category) => {
        acc[category] = false;
        return acc;
      }, {});
      setShowMore(initialShowMore);
    }
  }, [course_data]); // Recalculate when course_data changes

  const toggleShowMore = (category) => {
    setShowMore((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));

    setDisplayCounts((prev) => ({
      ...prev,
      [category]: showMore[category] ? initialDisplayCount : prev[category] + incrementDisplayCount,
    }));
  };

  const handleReadMoreClick = (course) => {
    // Navigate to the desired URL with the course ID
    navigate(`/video?course_id=${courseId}&chapter_id=${chapter_id}&video_id=${video_id}`);
  };

  return (
    <>
      <SubNavbar />
      <div className="w-full p-4">
        {loading ? (
          // Display skeleton loaders while loading
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(8).fill().map((_, index) => (
                <SkeletonLoader key={index} />
              ))}
            </div>
          </>
        ) : (
          randomCategories.map((category) => {
            const courses = course_data[category];
            const displayCount = displayCounts[category] || initialDisplayCount;
            return (
              <fieldset key={category} className="mb-8 border-2 border-gray-300 rounded-lg p-4">
                <legend className="text-2xl font-bold text-gray-800 px-2 py-1 rounded-md">{category}</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                  {courses.slice(0, displayCount).map((course, index) => (
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
                        <h5 className="text-xl font-semibold mb-3">{course.title}</h5>
                        <button
                          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                          onClick={() => handleReadMoreClick(course)} // Handle click to navigate
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex mt-4">
                  {courses.length > initialDisplayCount && (
                    <button
                      className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
                      onClick={() => toggleShowMore(category)}
                    >
                      {showMore[category] ? 'Show Less' : 'Show More'}
                    </button>
                  )}
                </div>
              </fieldset>
            );
          })
        )}
      </div>
    </>
  );
};

export default CourseDisplay;
