import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/certificate.css';
import { useParams } from 'react-router-dom';
import myimg from '../assets/images/myimg.png'
const Certificate = () => {
    const [username, setUsername] = useState('');
    const [courseName, setCourseName] = useState('');
    const [error, setError] = useState(null);
    const { courseId } = useParams(); 
    // Extract courseId from the URL params

    const myIP = import.meta.env.VITE_MY_IP;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("i am certificate useeffect")
        const fetchData = async () =>
            {

            const userData = JSON.parse(localStorage.getItem('user'));
            const userId =userData.user_id 

            // Retrieve user ID from local storage
            if (!userId) {
                setError('User ID not found in local storage');
                return;
            }

            try {
                console.log("courseid in certificate : ",courseId)
                const response = await axios.post(`http://${myIP}:3000/certificate`, {
                    userId,  // Pass userId in the request body
                    courseId // Pass courseId in the request body
                });

                setUsername(response.data.username);
                setCourseName(response.data.courseName);
            } catch (error) {
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Function to download certificate as PDF
    const downloadPDF = async() => {
        try{
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
        <div className="certificate">
            <div className="header">
                <div className="logo-container">
                    <img src={myimg} alt="Logo" className="logo" />
                </div>
                <h3 className="title">Certificate Of Completion {courseName}</h3>
            </div>
            <div className="separator"></div>
            <div className="content">
                {error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        <p>Congratulations <strong>{username}</strong> For Successfully Completion Of <strong>{courseName} Course</strong>.</p>
                    </>
                )}
            </div>
            <button onClick={downloadPDF} className="download-btn">Download Certificate</button>
            {loading && (
                <h1>Loading......</h1>
            )}
        </div>
    );
};

export default Certificate;
