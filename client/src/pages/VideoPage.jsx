import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaThumbsUp, FaThumbsDown, FaBars, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import MCQ from './MCQ';
import SkeletonLoader from '../components/Skeleton';
import { useLocation } from 'react-router-dom';
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
    const [courseCompleted, setCourseCompleted] = useState(false);
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const courseId = queryParams.get('course_id');
        const videoId = queryParams.get('video_id');
        const userData = JSON.parse(localStorage.getItem('user'));
        
        if (userData && userData.user_id) {
            setUserId(userData.user_id);  // Set userId here
            if (courseId && videoId) {
                fetchData(courseId, videoId, userData.user_id);  // Pass user_id directly to fetchData
            }
        }
    }, [location.search, location.state]);
    
    useEffect(() => {
        // Check progress here
        console.log("comming")

        if (progress === 100) {
            setCourseCompleted(true);
        }
    }, [progress]);

    const handleViewCertificate = () => {
        navigate(`/certificate/${courseId}`); // Adjust the path as necessary
    };

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
        const endpoint = userLiked ? '/vid/unlike-video' : '/vid/like-video';
        try {
            setLikes(prevLikes => userLiked ? prevLikes - 1 : prevLikes + 1);
            setUserLiked(prev => !prev);

            if (userDisliked) {
                setDislikes(prevDislikes => prevDislikes - 1);
                setUserDisliked(false);
            }

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
        const endpoint = userDisliked ? '/vid/undislike-video' : '/vid/dislike-video';
        try {
            setDislikes(prevDislikes => userDisliked ? prevDislikes - 1 : prevDislikes + 1);
            setUserDisliked(prev => !prev);

            if (userLiked) {
                setLikes(prevLikes => prevLikes - 1);
                setUserLiked(false);
            }

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
        navigate(`/course?course_id=${courseId}&chapter_id=${chapter_id}&video_id=${video_id}`);
    };

    const handleOpenMCQModal = () => {
        setShowMCQModal(true);
        setMcqLoading(true);
    };

    const handleCloseMCQModal = () => {
        setShowMCQModal(false);
        setMcqLoading(false);
    };

    return (
        <div className="flex h-[calc(100vh-12vh)] bg-indigo-50 mt-[8vh] mx-2"> {/* Added mx-2 for minor left and right margins */}
            <div className={`fixed top-[8vh] left-0 h-[calc(100vh-12vh)] transition-all duration-300 ease-in-out ${sidebarVisible ? 'w-[250px] opacity-100' : 'w-0 opacity-0'} bg-indigo-200 overflow-hidden`}>
                <div className="pt-3 h-full overflow-y-auto">
                    <h2 className="font-bold mr-2">Course Progress</h2>
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
                                        className="flex items-center cursor-pointer ml-7"
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

            <div className={`flex-grow pt-5 overflow-y-auto transition-all duration-300 ${sidebarVisible ? 'ml-[250px]' : 'ml-0'} ${showMCQModal ? 'blur-sm pointer-events-none' : ''}`}>
                <FaBars
                    onClick={toggleSidebar}
                    className="cursor-pointer text-2xl mb-5"
                />
                {loader ? (
                    <SkeletonLoader />
                ) : (
                    <div>
                        <div className="relative w-full h-5 bg-gray-300 rounded-lg mb-5">
                            <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-lg transition-all" style={{ width: `${progress}%` }}></div>
                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold">{progress}%</span>
                        </div>

                        <div className="relative w-full h-0 pb-[56.25%]">
                            <div className="w-full aspect-w-16 aspect-h-9 mb-5">
                                <iframe
                                    src={vlink}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full border-none"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-4">
                            <button className="flex items-center p-2 bg-indigo-200 rounded-md" onClick={handleLike}>
                                <FaThumbsUp className={`mr-1 ${userLiked ? 'text-blue-500' : ''}`} /> {likes}
                            </button>
                            <button className="flex items-center p-2 bg-indigo-200 rounded-md" onClick={handleDislike}>
                                <FaThumbsDown className={`mr-1 ${userDisliked ? 'text-red-500' : ''}`} /> {dislikes}
                            </button>
                        </div>

                        <button
                            onClick={handleOpenMCQModal}
                            className="bg-indigo-600 text-white mt-4 p-2 rounded-md hover:bg-indigo-600 focus:outline-none"
                        >
                            Take MCQ Test
                        </button>
                    </div>
                )}
            </div>
            {showMCQModal && (
                <div className="mcq-modal-overlay">
                    <div className="mcq-modal">
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
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg">
                        <h2 className="text-xl mb-4">Congratulations!</h2>
                        <p>You have completed the course!</p>
                        <button onClick={handleViewCertificate} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                            View Certificate
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPage;
