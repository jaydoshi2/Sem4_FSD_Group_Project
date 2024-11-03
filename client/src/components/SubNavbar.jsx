import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubNavbarSkeleton from '../components/SkeletonSubNavbar';

const SubNavbar = () => {
    const [course_data, setCourse_data] = useState([]);
    const [course_types, setCourse_types] = useState([]);
    const navbarRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollInterval, setScrollInterval] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const myIP = import.meta.env.VITE_MY_IP;

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if(userData != null){
            const userId = userData.userId;
            axios.post(`http://${myIP}:3000/course/getall`,{userId})
            .then((response) => {
                setCourse_data(response.data);
                setCourse_types([...new Set(response.data.map(item => item.course_type))]);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching course data:", error);
                setLoading(false);
            });
        }else{
            axios.post(`http://${myIP}:3000/course/getall`)
            .then((response) => {
                setCourse_data(response.data);
                setCourse_types([...new Set(response.data.map(item => item.course_type))]);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching course data:", error);
                setLoading(false);
            });   
        }
        

    }, []);

    const startDragging = (e) => {
        setIsDragging(true);
        setStartX(e.pageX || e.touches[0].pageX);
        setScrollLeft(navbarRef.current.scrollLeft);
        navbarRef.current.style.cursor = 'grabbing';
    };

    const stopDragging = () => {
        setIsDragging(false);
        navbarRef.current.style.cursor = 'grab';
    };

    const onDragging = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX || e.touches[0].pageX;
        const walk = (x - startX) * 2; // Increase scroll speed
        navbarRef.current.scrollLeft = scrollLeft - walk;
    };

    const startScrolling = (direction) => {
        const amount = direction === 'left' ? -10 : 10;
        const interval = setInterval(() => {
            navbarRef.current.scrollBy({ left: amount });
        }, 10);
        setScrollInterval(interval);
    };

    const stopScrolling = () => {
        if (scrollInterval) clearInterval(scrollInterval);
        setScrollInterval(null);
    };

    const handleNavigate = (courseType) => {
        navigate(`/skill?course_type=${encodeURIComponent(courseType)}`);
    };

    const handleTouchStart = (direction) => {
        startScrolling(direction);
    };

    const handleTouchEnd = () => {
        stopScrolling();
    };

    return (
        <div className="fixed top-0 left-0 w-full bg-indigo-200 shadow-md z-40 p-2 mt-16">
            <div className="flex items-center whitespace-nowrap select-none">
                <button
                    className="scroll-button bg-blue-950 text-white p-2 cursor-pointer hover:bg-[#1558B1] hover:scale-105 transition-transform duration-300 rounded-r-md focus:outline-none"
                    onMouseDown={() => startScrolling('left')}
                    onMouseUp={stopScrolling}
                    onMouseLeave={stopScrolling}
                    onTouchStart={() => handleTouchStart('left')}
                    onTouchEnd={handleTouchEnd}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                <div
                    className="scroll-area flex overflow-hidden hide-scrollbar cursor-grab active:cursor-grabbing w-full px-4"
                    ref={navbarRef}
                    onMouseDown={startDragging}
                    onMouseUp={stopDragging}
                    onMouseLeave={stopDragging}
                    onMouseMove={onDragging}
                    onTouchStart={startDragging}
                    onTouchEnd={stopDragging}
                    onTouchMove={onDragging}
                >
                    {loading ? (
                        <SubNavbarSkeleton />
                    ) : (
                        course_types.map((item, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 cursor-pointer flex-shrink-0 text-base transition-transform transform hover:scale-105 hover:bg-indigo-300 rounded-md duration-200"
                                onClick={() => handleNavigate(item)}
                            >
                                {item}
                            </div>
                        ))
                    )}
                </div>

                <button
                    className="scroll-button bg-blue-950 text-white p-2 cursor-pointer hover:bg-[#1558B1] hover:scale-105 transition-transform duration-300 rounded-l-md focus:outline-none"
                    onMouseDown={() => startScrolling('right')}
                    onMouseUp={stopScrolling}
                    onMouseLeave={stopScrolling}
                    onTouchStart={() => handleTouchStart('right')}
                    onTouchEnd={handleTouchEnd}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
};

export default SubNavbar;
