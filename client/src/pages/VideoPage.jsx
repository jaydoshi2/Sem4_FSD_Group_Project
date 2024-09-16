import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaThumbsUp, FaThumbsDown, FaBars, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/videopage.css';
import MCQ from './MCQ';

const VideoPage = () => {
    const navigate = useNavigate();
    const myIP = import.meta.env.VITE_MY_IP;
    const [vlink, setVlink] = useState('');
    const [loader, setLoader] = useState(false);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);
    const [progress, setProgress] = useState(0);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [id] = useState(JSON.parse(localStorage.getItem('user')));
    const [courseProgress, setCourseProgress] = useState([]);
    const [courseId, setCourseId] = useState(null);
    const [videoId, setVideoId] = useState(null);
    const [videoId1, setVideoId1] = useState('');
    const [showMCQModal, setShowMCQModal] = useState(false);
    const [mcqLoading, setMcqLoading] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const courseId = queryParams.get('course_id');
        const videoId = queryParams.get('video_id');
        if (courseId !== null && videoId !== null) {
            setCourseId(courseId);
            setVideoId(videoId);
            fetchData(courseId, videoId);
        }
    }, [window.location.search, videoId1]);

    const fetchData = async (courseId, videoId) => {
        try {
            setLoader(true);
            if (videoId) {
                console.log(window.location.search)
                const videoResponse = await axios.get(`http://${myIP}:3000/vid/video-details/${videoId}`);
                const videoData = videoResponse.data;
                const url = videoData.videoLink;
                console.log(url)
                const videoID = url.split('/').pop().split('?')[0];
                setVideoId1(videoID)
                const embedUrl = `https://www.youtube.com/embed/${videoId1}`;
                setVlink(embedUrl);
                setLikes(videoData.likesCount);
                setDislikes(videoData.dislikesCount);
                setUserLiked(videoData.userLiked);
                setUserDisliked(videoData.userDisliked);
            }

            if (courseId) {
                const token = localStorage.getItem('token');
                const progressResponse = await axios.get(`http://${myIP}:3000/vid/course-progress/${courseId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

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
        try {
            const endpoint = userLiked ? '/vid/unlike-video' : '/vid/like-video';
            await axios.post(`http://${myIP}:3000${endpoint}`, { videoId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setLikes(prevLikes => userLiked ? prevLikes - 1 : prevLikes + 1);
            setUserLiked(!userLiked);

            if (userDisliked) {
                setDislikes(dislikes - 1);
                setUserDisliked(false);
            }
        } catch (error) {
            console.error('Error liking the video:', error);
        }
    };

    const handleDislike = async () => {
        try {
            const endpoint = userDisliked ? '/vid/undislike-video' : '/vid/dislike-video';
            await axios.post(`http://${myIP}:3000${endpoint}`, { videoId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setDislikes(prevDislikes => userDisliked ? prevDislikes - 1 : prevDislikes + 1);
            setUserDisliked(!userDisliked);

            if (userLiked) {
                setLikes(likes - 1);
                setUserLiked(false);
            }
        } catch (error) {
            console.error('Error disliking the video:', error);
        }
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const renderIcon = (checked) => {
        return checked ? <FaCheck style={{ color: 'green' }} /> : <input type="checkbox" disabled />;
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
        // Navigation is now handled in the MCQ component
    };

    return (
        <div style={{ display: 'flex', backgroundColor: '#8697c4', marginTop: "12vh" }}>
            <div className={`sidebar ${!sidebarVisible && 'collapsed'}`} style={{ backgroundColor: "#adbbda" }}>
                <h2>Course Progress</h2>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {courseProgress.map((chapterData, index) => (
                        <div key={chapterData.chapter_id}>
                            <h3>
                                {chapterData.videos.every(video => video.completed) && (
                                    <FaCheck style={{ color: 'green', marginRight: '8px' }} />
                                )}
                                Chapter {index + 1}
                            </h3>
                            {chapterData.videos.map((videoData, idx) => (
                                <label key={videoData.video_id}>
                                    {renderIcon(videoData.completed)}
                                    <span
                                        onClick={() => goto(chapterData.chapter_id, videoData.video_id)}
                                        style={{ marginLeft: '8px', cursor: 'pointer' }}
                                    >
                                        Video {idx + 1}
                                    </span>
                                </label>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className={`main-content ${!sidebarVisible && 'collapsed'} ${showMCQModal ? 'blurred' : ''}`}>
                <FaBars
                    onClick={toggleSidebar}
                    style={{ cursor: 'pointer', fontSize: '24px', marginBottom: '20px' }}
                />
                {loader ? (
                    <h1>Loading, please wait...</h1>
                ) : (
                    <div>
                        <div className="progress-bar">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${progress}%` }}
                            />
                            <span className="progress-text">{progress}%</span>
                        </div>

                        {/* <iframe
                            src={vlink}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="video-frame"
                        ></iframe> */}

                        <div className="like-dislike-container">
                            <button className="like-button" onClick={handleLike}>
                                <FaThumbsUp style={{ color: userLiked ? 'blue' : 'gray' }} size={24} />
                                <span style={{ marginLeft: '8px' }}>{likes}</span>
                            </button>

                            <button className="dislike-button" onClick={handleDislike}>
                                <FaThumbsDown style={{ color: userDisliked ? 'red' : 'gray' }} size={24} />
                                <span style={{ marginLeft: '8px' }}>{dislikes}</span>
                            </button>
                        </div>

                        <button className="open-modal-button" onClick={handleOpenMCQModal}>Open Quiz Modal</button>
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
        </div>
    );
};

export default VideoPage;