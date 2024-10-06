import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../components/SkeletonLoader'; // Import the skeleton loader
import SubNavbar from '../components/SubNavbar';

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
  while (randomKeys.length < 3 && keys.length > 0) {
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
    axios.get("http://localhost:3000/course/getall")
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

  const handleReadMoreClick = async (course) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData.userId;

    // const userId=localStorage.getItem('user')
    const courseId = course.course_id;
    // navigate(`/courseDetails?course_id=${courseId}`);
    try {
      const response = await axios.post(`http://${myIP}:3000/course/check`, {
        userId,
        courseId,
      });

      // Redirect based on the response
      if (response.data.redirect) {
        if (response.data.redirect == "/video") {
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
        else {
          navigate(response.data.redirect);
        }
      }
    } catch (error) {
      console.error('Error checking user progress:', error);
    }
  };

  // Adjusting the background to a light color scheme with darker buttons.
  // Adjusting the background and other elements to a blue color scheme
  return (
    <div className="flex flex-col bg-[#E4EDF7]"> {/* Light blue background */}
      <SubNavbar />
      <div className="flex-grow mt-28"> {/* Added margin-top to push content below the fixed navbar */}
        <div className="w-full p-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(8).fill().map((_, index) => (
                <SkeletonLoader key={index} />
              ))}
            </div>
          ) : (
            randomCategories.map((category) => {
              const courses = course_data[category];
              const displayCount = displayCounts[category] || initialDisplayCount;
              return (
                <fieldset key={category} className="mb-8 border border-[#D9E6F5] rounded-lg p-4 bg-[#F0F7FD]"> {/* Lighter blue border */}
                  <legend className="text-2xl font-bold text-[#1e3a8a] px-2 py-1 rounded-md">{category}</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {courses.slice(0, displayCount).map((course, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg border border-[#D9E6F5] shadow-md text-center overflow-hidden transition-all duration-500 hover:shadow-lg"
                      >
                        <div className="h-48 rounded-t-lg flex justify-center items-center overflow-hidden p-2">
                          <img
                            src={course.thumbnail_pic_link}
                            alt={course.title}
                            className="h-full w-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="p-2">
                          <h5 className="text-xl font-semibold mb-3 text-[#1e3a8a]">{course.title}</h5> {/* Dark blue text */}
                          <button
                            className="bg-[#1d4ed8] text-white py-2 px-4 rounded hover:bg-[#1e40af] transition-colors duration-300"
                            onClick={() => handleReadMoreClick(course)}
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
                        className="bg-[#1d4ed8] text-white py-2 px-4 rounded hover:bg-[#1e40af] transition-colors duration-300"
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
      </div>
    </div>
  );

};

export default CourseDisplay;
