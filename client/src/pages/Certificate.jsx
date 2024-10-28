import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/certificate.css';
import { useParams } from 'react-router-dom';
import myimg from '../assets/images/myimg.png'
import BookLoader from '../components/BookLoader';
const Certificate = () => {
    const [username, setUsername] = useState('');
    const [courseName, setCourseName] = useState('');
    const [error, setError] = useState(null);
    const { courseId } = useParams();
    // Extract courseId from the URL params

    const myIP = import.meta.env.VITE_MY_IP;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const userData = JSON.parse(localStorage.getItem('user'));
            const userId = userData.userId

            // Retrieve user ID from local storage
            if (!userId) {
                setError('User ID not found in local storage');
                return;
            }

            try {
                console.log("courseid in certificate : ", courseId)
                const response = await axios.post(`http://${myIP}:3000/certificate`, {
                    userId,  // Pass userId in the request body
                    courseId // Pass courseId in the request body
                });

                setUsername(response.data.username);
                setCourseName(response.data.courseName);
                setLoading(false)
            } catch (error) {
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Function to download certificate as PDF
    const downloadPDF = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`http://${myIP}:3000/certificate/get`, { username, courseName }, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${username}-certificate.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error generating and downloading certificate:', error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="w-[90vw] max-w-[80vh] mx-auto bg-indigo-50 p-[5vh_4vw] shadow-md rounded-[2vh] box-border mt-10 ">
            <div className="text-center mb-[5vh]">
                <div className="w-[40%] max-w-[200px] mx-auto mb-[3vh]">
                    <img src={myimg} alt="Logo" className="w-full h-auto rounded-full object-cover" />
                </div>
                <h3 className="text-[calc(1rem+1vw)] my-[2vh] text-gray-800 uppercase">
                    Certificate Of Completion {courseName}
                </h3>
            </div>
            <div className="w-full h-[0.5vh] bg-gray-800 my-[2vh]"></div>
            <div className="text-center text-[calc(0.8rem+0.8vw)] text-gray-600">
                {error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        <p>
                            Congratulations <strong>{username}</strong> for successfully completing the <strong>{courseName} Course</strong>.
                        </p>
                    </>
                )}
            </div>
            <button onClick={downloadPDF} className="download-btn">Download Certificate</button>
            {loading && (
                < BookLoader />
            )}

        </div>
    );
}
    export default Certificate;
