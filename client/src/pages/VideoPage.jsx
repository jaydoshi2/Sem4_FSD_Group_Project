import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaBars, FaCheck, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import SkeletonLoader from '../components/Skeleton';
import MCQ from './MCQ';
const VideoPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userId, setUserId] = useState();
    const myIP = import.meta.env.VITE_MY_IP;
    const [vlink, setVlink] = useState('');
    const [loader, setLoader] = useState(false);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);
    const [progress, setProgress] = useState(0);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [courseProgress, setCourseProgress] = useState([]);
    const [courseId, setCourseId] = useState(null);
    const [videoId, setVideoId] = useState(null);
    const [videoId1, setVideoId1] = useState('');
    const [showMCQModal, setShowMCQModal] = useState(false);
    const [mcqLoading, setMcqLoading] = useState(false);
    const [chapterId, setChapterId] = useState('');
    const [courseCompleted, setCourseCompleted] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const courseId = queryParams.get('course_id');
        const videoId = queryParams.get('video_id');
        const chapterId1 = queryParams.get('chapter_id');  // Ensure this is the correct name
        const userData = JSON.parse(localStorage.getItem('user'));
        setCourseId(Number(courseId)); // Ensuring courseId is a number
        setVideoId(Number(videoId));
        setChapterId(chapterId1); // Set the chapter state correctly

        console.log('Chapter ID:', chapterId); // Debugging line

        if (userData && userData.userId) {
            setUserId(userData.userId);
            if (courseId && videoId) {
                fetchData(courseId, videoId, userData.userId);
            }
        }
    }, [location.search]);

    const fetchData = async (courseId, videoId, userId) => {
        try {
            setLoader(true);

            if (videoId) {
                const videoResponse = await axios.get(`http://${myIP}:3000/vid/video-details/${videoId}`);
                const videoData = videoResponse.data;
                const url = videoData.videoLink;
                const videoID = url.split('/').pop().split('?')[0];
                setVideoId1(videoID);
                const embedUrl = `https://www.youtube.com/embed/${videoID}`;
                setVlink(embedUrl);
                setLikes(videoData.likesCount);
                setDislikes(videoData.dislikesCount);
                setUserLiked(videoData.userLiked);
                setUserDisliked(videoData.userDisliked);
            }

            if (courseId && userId) {  // Ensure userId is not undefined
                console.log("User ID in fetchData:", userId);
                const progressResponse = await axios.post(`http://${myIP}:3000/vid/course-progress/${courseId}`, { userId });
                setProgress(progressResponse.data.completed_course);
                setCourseProgress(progressResponse.data.chapters);
            }

            setLoader(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoader(false);
        }
    };



    const handleLike = async () => {
        console.log("userrid : ", userId)
        const endpoint = userLiked ? '/vid/unlike-video' : '/vid/like-video';
        try {
            setLikes(prevLikes => userLiked ? prevLikes - 1 : prevLikes + 1);
            setUserLiked(prev => !prev);

            if (userDisliked) {
                setDislikes(prevDislikes => prevDislikes - 1);
                setUserDisliked(false);
            }
            console.log("video id :", videoId)
            await axios.post(`http://${myIP}:3000${endpoint}`, { videoId, userId }, {
            });
        } catch (error) {
            console.error('Error liking the video:', error);
            setLikes(prevLikes => userLiked ? prevLikes + 1 : prevLikes - 1);
            setUserLiked(prev => !prev);
            if (userDisliked) {
                setDislikes(prevDislikes => prevDislikes + 1);
                setUserDisliked(true);
            }
        }
    };

    const handleDislike = async () => {
        console.log("userrid : ", userId)
        const endpoint = userDisliked ? '/vid/undislike-video' : '/vid/dislike-video';
        try {
            setDislikes(prevDislikes => userDisliked ? prevDislikes - 1 : prevDislikes + 1);
            setUserDisliked(prev => !prev);

            if (userLiked) {
                setLikes(prevLikes => prevLikes - 1);
                setUserLiked(false);
            }
            console.log("video id :", videoId)

            await axios.post(`http://${myIP}:3000${endpoint}`, { videoId, userId }, {
            });
        } catch (error) {
            console.error('Error disliking the video:', error);
            setDislikes(prevDislikes => userDisliked ? prevDislikes + 1 : prevDislikes - 1);
            setUserDisliked(prev => !prev);
            if (userLiked) {
                setLikes(prevLikes => prevLikes + 1);
                setUserLiked(true);
            }
        }
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const renderIcon = (checked) => {
        return checked ? <FaCheck className="text-green-500" /> : <input type="checkbox" disabled />;
    };

    const goto = (chapter_id, video_id) => {
        navigate(`/video?course_id=${courseId}&chapter_id=${chapter_id}&video_id=${video_id}`);
    };

    const handleOpenMCQModal = () => {
        setShowMCQModal(true);
        setMcqLoading(true);
    };

    const handleCloseMCQModal = () => {
        setShowMCQModal(false);
        setMcqLoading(false);
    };
        // ... your existing state and functions ...

    return (
        <div className="flex flex-col min-h-screen bg-indigo-100">
            {/* Main content wrapper */}
            <div className="flex flex-grow pt-16">
                {/* Sidebar */}
                <div className={`transition-all duration-300 ease-in-out ${sidebarVisible
                        ? 'w-full sm:w-[250px]'
                        : 'w-0'
                    } bg-indigo-200 overflow-y-auto z-30`}>
                    <div className="pt-3 h-full pb-20">
                        <h2 className="font-bold mr-2 px-3">Course Progress</h2>
                        <div className="flex flex-col">
                            {courseProgress.map((chapterData, index) => (
                                <div key={chapterData.chapter_id} className="mb-3">
                                    <h3 className="flex items-center text-2xl ml-3">
                                        {chapterData.videos.every(video => video.completed) && (
                                            <FaCheck className="text-green-500 ml-3" />
                                        )}
                                        Chapter-{index + 1}
                                    </h3>
                                    {chapterData.videos.map((videoData, idx) => (
                                        <label
                                            key={videoData.video_id}
                                            className="flex items-center cursor-pointer ml-7 bg-indigo-200"
                                        >
                                            {renderIcon(videoData.completed)}
                                            <span
                                                onClick={() => goto(chapterData.chapter_id, videoData.video_id)}
                                                className={`ml-4 ${Number(videoId) === videoData.video_id ? 'underline' : ''}`}
                                            >
                                                Video {idx + 1}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-grow">
                    {/* Toggle button - Now in separate container */}
                    <div className="p-4">
                        <FaBars
                            onClick={toggleSidebar}
                            className="cursor-pointer text-2xl mb-5"
                        />
                    </div>

                    {/* Content container - This part gets hidden */}
                    <div className={`p-4 transition-all duration-300 ${showMCQModal
                            ? 'blur-sm pointer-events-none'
                            : ''
                        } ${sidebarVisible
                            ? 'hidden sm:block'
                            : 'block'
                        }`}>
                        {loader ? (
                            <SkeletonLoader />
                        ) : (
                            <div className="mb-20">
                                {/* Progress bar */}
                                <div className="relative w-full h-5 bg-gray-300 rounded-lg mb-5">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-blue-500 rounded-lg transition-all"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold">
                                        {progress}%
                                    </span>
                                </div>

                                {/* Video section */}
                                <div className="w-full max-w-4xl mx-auto">
                                    <div className="relative w-full pb-[56.25%]">
                                        <iframe
                                            src={vlink}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                                        />
                                    </div>
                                </div>

                                {/* Like/Dislike buttons */}
                                <div className="flex gap-3 mt-10">
                                    <button
                                        className="flex items-center p-2 bg-indigo-200 rounded-md"
                                        onClick={handleLike}
                                    >
                                        <FaThumbsUp className={`mr-1 ${userLiked ? 'text-blue-500' : ''}`} /> {likes}
                                    </button>
                                    <button
                                        className="flex items-center p-2 bg-indigo-200 rounded-md"
                                        onClick={handleDislike}
                                    >
                                        <FaThumbsDown className={`mr-1 ${userDisliked ? 'text-red-500' : ''}`} /> {dislikes}
                                    </button>
                                </div>

                                <button
                                    onClick={handleOpenMCQModal}
                                    className="bg-indigo-600 text-white mt-4 p-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none"
                                >
                                    Take MCQ Test
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showMCQModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <MCQ
                            props={{ vid: videoId1 }}
                            loading={mcqLoading}
                            setLoading={setMcqLoading}
                            onClose={handleCloseMCQModal}
                        />
                    </div>
                </div>
            )}

            {courseCompleted && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
                        <p className="text-gray-600 mb-6">You have completed the course!</p>
                        <button
                            onClick={handleViewCertificate}
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                        >
                            View Certificate
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPage;
