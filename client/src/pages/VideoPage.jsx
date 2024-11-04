import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaBars, FaCheck, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import SkeletonLoader from '../components/Skeleton';
import Certificate from './Certificate';
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
    const [showCertificatePopup, setShowCertificatePopup] = useState(false);
    const [pointsUpdated, setPointsUpdated] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const courseId = queryParams.get('course_id');
        const videoId = queryParams.get('video_id');
        const chapterId1 = queryParams.get('chapter_id');
        const userData = JSON.parse(localStorage.getItem('user'));
        setCourseId(Number(courseId));
        setVideoId(Number(videoId));
        setChapterId(chapterId1);

        if (userData && userData.userId) {
            setUserId(userData.userId);
            if (courseId && videoId) {
                fetchData(courseId, videoId, userData.userId);
            }
        }
    }, [location.search]);


    const viewCertificate = () => {
        setLoader(true);
        navigate(`/certificate/${courseId}`);
        setLoader(false);
    };

    useEffect(() => {
        const handleCourseCompletion = async () => {
            // if (progress === 100 && courseCompleted && !pointsUpdated && userId && courseId) {
            //     try {
            //         await axios.post(`http://${myIP}:3000/vid/getpoints`, {
            //             userId,
            //             courseId
            //         });
            //         setPointsUpdated(true);
            //         localStorage.setItem(`course_${courseId}_completed`, 'true');
            //     } catch (error) {
            //         console.error('Error updating points:', error);
            //     }
            // }

            // try {
            //     const response = await axios.post(`http://${myIP}:3000/certificate/storeCertificate`,{userId,courseId})
            // } catch (error) {

            // }
            console.log("user id ",userId)
            if(userId){
                console.log(true)
                const checkCertificate = await axios.get(`http://${myIP}:3000/certificate/check`, {
                    params: {
                        userId,
                        courseId
                    }
                });
    
                if (!checkCertificate.data.exists) {
                    console.log("POINTS GIVEN ",true)
                    // Certificate.storeImageInDB();
                    try {
                        await axios.post(`http://${myIP}:3000/vid/getpoints`, {
                            userId,
                            courseId
                        });
                        
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
          
        };

        handleCourseCompletion();
    }, [progress, courseCompleted, userId, courseId, myIP]);

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

            if (courseId && userId) {
                const progressResponse = await axios.post(`http://${myIP}:3000/vid/course-progress/${courseId}`, { userId });
                setProgress(progressResponse.data.completed_course);

                if (progressResponse.data.completed) {
                    setCourseCompleted(true);
                    const isAlreadyCompleted = localStorage.getItem(`course_${courseId}_completed`) === 'true';
                    setPointsUpdated(isAlreadyCompleted);
                }

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

            await axios.post(`http://${myIP}:3000${endpoint}`, { videoId, userId });
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

            await axios.post(`http://${myIP}:3000${endpoint}`, { videoId, userId });
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

    const handleViewCertificate = () => {
        setShowCertificatePopup(true);
    };

    const handleCloseCertificatePopup = () => {
        setShowCertificatePopup(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-indigo-100">
            {courseCompleted && showCertificatePopup}
            <div className="flex flex-grow pt-16">
                <div className={`transition-all duration-300 ease-in-out ${sidebarVisible ? 'w-full sm:w-[250px]' : 'w-0'
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
                        {courseCompleted && (
                            <button
                                onClick={viewCertificate}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                            >
                                View Certificate
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex-grow">
                    <div className="p-4">
                        <FaBars
                            onClick={toggleSidebar}
                            className="cursor-pointer text-2xl mb-5"
                        />
                    </div>

                    <div className={`p-4 transition-all duration-300 ${showMCQModal ? 'blur-sm pointer-events-none' : ''
                        } ${sidebarVisible ? 'hidden sm:block' : 'block'}`}>
                        {loader ? (
                            <SkeletonLoader />
                        ) : (
                            <div className="mb-20">
                                <div className="relative w-full h-5 bg-gray-300 rounded-lg mb-5">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-blue-500 rounded-lg transition-all"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold">
                                        {progress}%
                                    </span>
                                </div>

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

                                <div className="flex mt-4 space-x-4">
                                    <button
                                        onClick={handleLike}
                                        className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                                    >
                                        <FaThumbsUp />
                                        <span>{likes}</span>
                                    </button>
                                    <button
                                        onClick={handleDislike}
                                        className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                                    >
                                        <FaThumbsDown />
                                        <span>{dislikes}</span>
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

            {showCertificatePopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
                        <button
                            onClick={handleCloseCertificatePopup}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">Congratulations!</h2>
                        <p>You have completed the course. Here is your certificate.</p>
                        <button
                            onClick={() => { }}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Download Certificate
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPage;