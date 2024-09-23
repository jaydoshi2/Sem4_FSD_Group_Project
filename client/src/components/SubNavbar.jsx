import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubNavbarSkeleton from '../components/SkeletonSubNavbar';
import '../styles/SubNavbar.css';
const SubNavbar = () => {
    const [course_data, setCourse_data] = useState([]);
    const [course_types, setCourse_types] = useState([]);
    const navbarRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollInterval, setScrollInterval] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:3000/course/getAll")
            .then((response) => {
                console.log("Hello");
                console.log(response.data);
                setCourse_data(response.data);
                setCourse_types([...new Set(response.data.map(item => item.course_type))]);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching course data:", error);
                setLoading(false);
            });
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
        const walk = (x - startX) * 2; // Multiplied by 2 to increase the scroll speed
        navbarRef.current.scrollLeft = scrollLeft - walk;
    };

    const startScrolling = (direction) => {
        const amount = direction === 'left' ? -10 : 10;
        const interval = setInterval(() => {
            navbarRef.current.scrollBy({ left: amount });
        }, 10); // Adjust speed by changing interval or amount
        setScrollInterval(interval);
    };

    const stopScrolling = () => {
        if (scrollInterval) clearInterval(scrollInterval);
        setScrollInterval(null);
    };

    const handleNavigate = (courseType) => {
        navigate(`/skill?course_type=${courseType}`);
    };

    return (
        <div className="flex items-center overflow-hidden whitespace-nowrap select-none w-full relative">
            <button
                className="bg-gray-700 text-white p-2 cursor-pointer select-none mr-1 hover:bg-gray-800 hover:scale-105 transition-transform duration-200"
                onMouseDown={() => startScrolling('left')}
                onMouseUp={stopScrolling}
                onMouseLeave={stopScrolling}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div
                className="flex overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing w-full pr-8"
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
                    <SubNavbarSkeleton />  // Show skeleton when loading
                ) : (
                    course_types.map((item, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 cursor-pointer flex-shrink-0 text-base transition-transform transform hover:scale-110 hover:bg-gray-200 rounded-md"
                            onClick={() => handleNavigate(item)}
                        >
                            {item}
                        </div>
                    ))
                )}
            </div>
            <button
                className="bg-gray-700 text-white p-2 cursor-pointer select-none hover:bg-gray-800 hover:scale-105 transition-transform duration-200 absolute right-0"
                onMouseDown={() => startScrolling('right')}
                onMouseUp={stopScrolling}
                onMouseLeave={stopScrolling}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
};

export default SubNavbar;
