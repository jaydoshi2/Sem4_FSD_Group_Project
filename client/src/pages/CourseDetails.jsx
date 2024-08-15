import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/CourseDetails.css';

const CourseDetails = () => {
  const { courseId } = useParams(); // Get the courseId from the URL parameters
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const myIP = import.meta.env.VITE_MY_IP;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://${myIP}:3000/course/${courseId}`);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course details", error);
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) return <div>Loading...</div>;

  if (!course) return <div>No course found.</div>;

  return (
    <div className="course-details-container">
      <h1>{course.title}</h1>
      <img className="course-thumbnail" src={course.thumbnail_pic_link} alt={course.title} />
      <div className="course-details">
        <h2>Description</h2>
        <p>{course.description}</p>

        <h2>Course Type</h2>
        <p>{course.course_type}</p>

        <h2>Price</h2>
        <p>${course.price}</p>

        <h2>Points Provided</h2>
        <p>{course.points_provide}</p>

        <h2>Certificate</h2>
        {course.certificate_preview_link ? (
          <a href={course.certificate_preview_link} target="_blank" rel="noopener noreferrer">
            View Certificate
          </a>
        ) : (
          <p>No certificate available</p>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
