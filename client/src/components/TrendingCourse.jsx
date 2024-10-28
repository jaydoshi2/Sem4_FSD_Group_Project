import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookLoader from './BookLoader';
import TrendingSkeleton from './TrendingSkeleton';

const CustomSlider = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const myIP = import.meta.env.VITE_MY_IP;
    const navigate = useNavigate();
    const [visibleSlides, setVisibleSlides] = useState(4); // default for large screens

    useEffect(() => {
        const updateSlides = () => {
            if (window.innerWidth < 640) {
                setVisibleSlides(1); // mobile
            } else if (window.innerWidth < 768) {
                setVisibleSlides(2); // tablets
            } else if (window.innerWidth < 1024) {
                setVisibleSlides(3); // small desktops
            } else {
                setVisibleSlides(4); // large screens
            }
        };

        window.addEventListener("resize", updateSlides);
        updateSlides();

        return () => window.removeEventListener("resize", updateSlides);
    }, []);


    useEffect(() => {
        const fetchTrendingCourses = async () => {
            const userId = JSON.parse(localStorage.getItem('user')).userId;
            try {
                const response = await fetch(`http://${myIP}:3000/course/trending`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching trending courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingCourses();
    }, []);

    // Auto-sliding functionality
    useEffect(() => {
        if (data.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % Math.max(1, data.length - 3));
        }, 3000);

        return () => clearInterval(interval);
    }, [data]);

    const viewCertificate = (course) => {
        setLoading1(true);
        navigate(`/certificate/${course.course_id}`);
        setLoading1(false);
    };

    const resumeCourse = async (course) => {
        setLoading1(true);
        const courseId = course.course_id;
        try {
            const response = await axios.get(`http://${myIP}:3000/from/first-chapter-video/${courseId}`);
            const data = response.data;
            if (response.status === 200) {
                const chapter_id = data.chapter_id;
                const video_id = data.video_id;
                navigate(`/video?course_id=${courseId}&chapter_id=${chapter_id}&video_id=${video_id}`);
            } else {
                console.error('Error fetching chapter and video:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading1(false);
        }
    };
    const readMore = (course) => {
        setLoading1(true);
        navigate(`/courseDetails?course_id=${course.course_id}`);
        setLoading1(false);
    }
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % Math.max(1, data.length - 3));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? Math.max(0, data.length - 4) : prev - 1));
    };

    if (loading1) {
        return <BookLoader />;
    }

    return (
        <div className="container mx-auto px-4">
            <div className="text-center">
                <h1 className="text-[#324aad] text-3xl md:text-4xl font-bold relative inline-block pb-2.5 mb-6">
                    Trending Courses
                    <span className="block w-32 h-0.5 bg-[#5c8bf5] mx-auto mt-2"></span>
                </h1>
            </div>
            <div className="my-8 relative bg-indigo-200 overflow-hidden">
                {loading ? (
                    <TrendingSkeleton />
                ) : (
                    <div className="relative">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100 / visibleSlides}%)` }}
                        >
                            {data.map((course) => (
                                <div
                                    key={course.course_id}
                                    className="min-w-[100%] sm:min-w-[50%] md:min-w-[33.333%] lg:min-w-[25%] p-4"
                                >
                                    <div className="bg-indigo-50 shadow-lg rounded-lg overflow-hidden border border-indigo-950 p-2">
                                        <img
                                            src={course.thumbnail_pic_link}
                                            alt={course.title}
                                            className="w-full h-40 object-cover sm:h-50 md:h-60 lg:h-68"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-center">{course.title}</h3>
                                            <div className="mt-4 flex justify-center">
                                                {course.completed_course === 100 ? (
                                                    <button
                                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                                                        onClick={() => viewCertificate(course)}
                                                    >
                                                        Download Certificate
                                                    </button>
                                                ) : course.purchased ? (
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                                        onClick={() => resumeCourse(course)}
                                                    >
                                                        Resume
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                                                        onClick={() => readMore(course)}
                                                    >
                                                        Read More
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation buttons */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-indigo-800 text-white p-2 rounded-full hover:bg-indigo-950 transition-colors z-10"
                        >
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-indigo-800 text-white p-2 rounded-full hover:bg-indigo-950 transition-colors z-10"
                        >
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

};

export default CustomSlider;