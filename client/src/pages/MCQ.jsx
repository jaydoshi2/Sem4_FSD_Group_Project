import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/MCQ.css';
import BookLoader from '../components/BookLoader'
const MCQ = ({ props, onClose }) => {
    const navigate = useNavigate();
    const myIP = import.meta.env.VITE_MY_IP;
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [error, setError] = useState('');
    const [feedback, setFeedback] = useState('');
    const [ytvideoId, setytVideoId1] = useState('');

    useEffect(() => {
        setytVideoId1(props.vid);
    }, [props.vid]);

    useEffect(() => {
        if (ytvideoId) {
            fetchQuestions();
        }
    }, [ytvideoId]);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://${myIP}:3000/vid/generate-mcqs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ videoId: ytvideoId }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.success) {
                const response2 = await fetch(`http://${myIP}:3000/vid/generate-mcqs`, { method: 'GET', credentials: 'include' });
                const data2 = await response2.json();

                const que = data2.questions || [];
                const opt = data2.options || [];
                const ans = data2.answers || [];

                const mappedQuestions = que.map((question, index) => ({
                    questionText: question,
                    options: opt[index],
                    correctAnswer: ans[index]
                }));

                setQuestions(mappedQuestions);
            } else {
                setError('Error generating MCQs. Please try again.');
            }
        } catch (error) {
            console.error("An error occurred. Please try again later.");
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        onClose();
        if(submitted){
            const url = window.location.search;
            window.location.reload()
            navigate('/video' + url, { state: { shouldRender: true } });
        }
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedOptions({});
        setSubmitted(false);
        setScore(0);
        setError('');
        setFeedback('');
    };

    const handleOptionClick = (questionIndex, option) => {
        setSelectedOptions(prev => ({
            ...prev,
            [questionIndex]: option
        }));
        setError('');
    };

    const handleSubmit = async () => {
        if (Object.keys(selectedOptions).length < questions.length) {
            setError('Please answer all questions before submitting.');
            return;
        }

        let newScore = 0;
        questions.forEach((question, index) => {
            if (selectedOptions[index] === question.correctAnswer) {
                newScore++;
            }
        });
        setScore(newScore);
        setSubmitted(true);

        if (newScore < 5) {
            setFeedback('Your score is less than 5. You need to re-attend the quiz.');
            setTimeout(() => resetQuiz(), 3000);
        } else {
            setFeedback(`Your score is: ${newScore} / ${questions.length}`);
            try {
                setLoading(true)
                const queryParams = new URLSearchParams(window.location.search);
                const userData = JSON.parse(localStorage.getItem('user'));
                const userId = userData.userId;
                const videoId = queryParams.get('video_id');
                const chapterId = queryParams.get('chapter_id');
                const courseId = queryParams.get('course_id');

                const response = await axios.post(`http://${myIP}:3000/vid/update-chapter-course-progress`, {
                    userId,
                    videoId,
                    chapterId,
                    courseId
                });
                const response2 = await axios.post(`http://${myIP}:3000/vid/update-progress`, {
                    userId,
                    courseId
                })
                if (response.data.success) {
                    console.log('Video progress updated successfully');
                    setLoading(false)
                } else {
                    console.error('Failed to update video progress:', response.data.message);
                }
            } catch (error) {
                console.error('Error updating video progress:', error);
            }
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    return (
        <div className="App">
            {loading && (
                <BookLoader />
            )}
            {!loading && (
                <div className="modal show">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="quiz-container">
                            <div className="question-block">
                                <div className="question-text">{questions[currentQuestionIndex]?.questionText}</div>
                                <div className="options">
                                    {questions[currentQuestionIndex]?.options.map(option => (
                                        <button
                                            key={option}
                                            className={`option-button ${selectedOptions[currentQuestionIndex] === option ? 'selected' : ''
                                                } ${submitted ?
                                                    (option === questions[currentQuestionIndex].correctAnswer ? 'correct' : (option === selectedOptions[currentQuestionIndex] ? 'incorrect' : '')) : ''
                                                }`}
                                            onClick={() => handleOptionClick(currentQuestionIndex, option)}
                                            disabled={submitted}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {error && <div className="error">{error}</div>}
                            <div className="navigation-buttons">
                                <button className="nav-button" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</button>
                                <button className="nav-button" onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
                            </div>
                            <button className="submit-button" onClick={handleSubmit} disabled={submitted}>Submit</button>
                            {submitted && <div className="feedback">{feedback}</div>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MCQ;
