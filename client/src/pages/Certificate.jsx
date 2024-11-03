import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/certificate.css';
import { useParams } from 'react-router-dom';
import myimg from '../assets/images/myimg.png';
import BookLoader from '../components/BookLoader';
import Confetti from 'react-confetti';
import html2canvas from 'html2canvas';

const Certificate = () => {
    const [username, setUsername] = useState('');
    const [courseName, setCourseName] = useState('');
    const [error, setError] = useState(null);
    const { courseId } = useParams();
    const myIP = import.meta.env.VITE_MY_IP;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const userData = JSON.parse(localStorage.getItem('user'));
            const userId = userData.userId;

            if (!userId) {
                setError('User ID not found in local storage');
                return;
            }

            try {
                const response = await axios.post(`http://${myIP}:3000/certificate`, {
                    userId,
                    courseId
                });

                setUsername(response.data.username);
                setCourseName(response.data.courseName);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const generateImage = async () => {
        try {
            setLoading(true);
            const userData = JSON.parse(localStorage.getItem('user'));
            const userId = userData.userId;

            const certificateElement = document.querySelector('.certificate-container');
            const canvas = await html2canvas(certificateElement, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#F5F7FF',
                logging: true,
                width: certificateElement.offsetWidth,
                height: certificateElement.offsetHeight
            });

            canvas.toBlob(async (blob) => {
                const imageFile = new File([blob], `${username}-certificate.png`, { type: 'image/png' });
                const mimeType = imageFile.type;
                const response = await axios.get(`http://${myIP}:3000/auth/presignedurl`, {
                    params: { mimeType }
                });
                const presignedUrl = response.data.url;
                const formData = new FormData();

                formData.append("bucket", response.data.fields["bucket"]);
                formData.append("Content-Type", mimeType);
                formData.append("X-Amz-Algorithm", response.data.fields["X-Amz-Algorithm"]);
                formData.append("X-Amz-Credential", response.data.fields["X-Amz-Credential"]);
                formData.append("X-Amz-Date", response.data.fields["X-Amz-Date"]);
                formData.append("Policy", response.data.fields["Policy"]);
                formData.append("X-Amz-Signature", response.data.fields["X-Amz-Signature"]);
                formData.append("key", response.data.fields["key"]);
                formData.append("file", imageFile);

                await axios.post(presignedUrl, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                const imageUrl = `${import.meta.VITE_CLOUDFRONT_URL}/${response.data.fields["key"]}`;

                await axios.post(`http://${myIP}:3000/certificate/storeImage`, {
                    userId,
                    courseId,
                    imageUrl
                }).then(console.log("suess")).catch((error) => {
                    console.log("error ", error)
                });

                const downloadUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = `${username}-certificate.png`;
                document.body.appendChild(link);
                link.click();
                link.remove();
                URL.revokeObjectURL(downloadUrl);

            }, 'image/png', 1.0);

        } catch (error) {
            console.error('Error generating and downloading certificate:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[80vw] max-w-[80vw] mx-auto bg-indigo-50 p-[4vh_6vw] shadow-md rounded-[2vh] box-border mt-10">
            <Confetti />
            <div className="certificate-container bg-indigo-50 p-[4vh_6vw] rounded-[2vh]">
                <div className="text-center mb-[4vh]">
                    <div className="w-[30%] max-w-[150px] mx-auto mb-[2vh]">
                        <img
                            src={myimg}
                            alt="Logo"
                            className="w-full h-auto rounded-full object-cover"
                            crossOrigin="anonymous"
                        />
                    </div>
                    <h3 className="text-[calc(1rem+1vw)] my-[1.5vh] text-gray-800 uppercase">
                        Certificate Of Completion<br />
                        {courseName}
                    </h3>
                </div>
                <div className="w-full h-[0.4vh] bg-gray-800 my-[1.5vh]"></div>
                <div className="text-center text-[calc(0.8rem+0.8vw)] text-gray-600">
                    {error ? (
                        <p>{error}</p>
                    ) : (
                        <p>
                            Congratulations <strong>{username}</strong> for successfully completing the <strong>{courseName} Course</strong>.
                        </p>
                    )}
                </div>
            </div>

            <button
                onClick={generateImage}
                className="download-btn mt-4"
                disabled={loading}
            >
                {loading ? 'Generating...' : 'Download Certificate'}
            </button>
            {loading && <BookLoader />}
        </div>

    );
};

export default Certificate;