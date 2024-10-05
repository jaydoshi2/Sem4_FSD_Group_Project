import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookLoader from '../components/BookLoader';
import { Link } from 'react-router-dom';

function CourseDetail() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get('course_id');
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState();
  const [error, setError] = useState(null);
  const [navigationData, setNavigationData] = useState(null);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user'));
  const userId = userData.userId;
  const myIP = import.meta.env.VITE_MY_IP;
  console.log("user id ", userId)

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://${myIP}:3000/course/${courseId}`);
        setCourse(response.data);
        setAmount(response.data.price);
      } catch (err) {
        console.error('Error fetching course details:', err);
        setError('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId, myIP]);

  useEffect(() => {
    if (navigationData) {
      const { chapter_id, video_id } = navigationData;
      console.log('Navigating to video page with data:', { courseId, chapter_id, video_id });
      navigate(`/video?course_id=${courseId}&chapter_id=${chapter_id}&video_id=${video_id}`);
    }
  }, [navigationData, courseId, navigate]);

  const nextpage = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('Initiating payment process');
      const orderUrl = `http://${myIP}:3000/user/make-payment`;
      const response = await axios.post(orderUrl, {
        amount,
        currency: 'INR',
        receipt: 'receipt#1',
      });

      const { id, amount: orderAmount, currency } = response.data;
      console.log('Payment order created:', { id, orderAmount, currency });

      if (window.Razorpay) {
        const options = {
          key: 'rzp_test_pVMPiZnpHDsa6g', // Replace with your actual Razorpay key
          amount: orderAmount,
          currency,
          name: 'Your Company Name',
          description: 'Course Enrollment',
          order_id: id,
          handler: async function (paymentResponse) {
            console.log('Payment successful, processing enrollment');
            try {
              const response = await axios.post(`http://${myIP}:3000/user/enroll-course`, {
                userId,
                courseId,
              });
              console.log('User enrolled in course');
              if (response) {
                const response1 = await axios.get(`http://${myIP}:3000/from/first-chapter-video/${courseId}`);
                const data = response1.data;
                console.log('Fetched first chapter and video:', data);

                if (response1.status === 200 && data) {
                  setNavigationData(data);
                } else {
                  console.error('Error fetching chapter and video:', data.message);
                  setError('Failed to fetch course content');
                }
              }
              else {
                console.log("wrong")
              }
            } catch (error) {
              console.error('Error during payment success handler:', error);
              setError('An error occurred while processing your enrollment');
            } finally {
              setLoading(false);
            }
          },
          prefill: {
            name: userData.name || 'User Name',
            email: userData.email || 'user@example.com',
            contact: userData.phone || '9999999999',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

        rzp.on('payment.failed', function (response) {
          console.error('Payment failed:', response);
          setError('Payment failed. Please try again.');
          setLoading(false);
        });

        rzp.on('payment.cancel', function () {
          console.log('Payment cancelled by user');
          setError('Payment was cancelled. Please try again if you wish to enroll.');
          setLoading(false);
        });
      } else {
        console.error('Razorpay script not loaded');
        setError('Unable to initiate payment. Please try again later.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error making payment request:', error);
      setError('Failed to initiate payment. Please try again.');
      setLoading(false);
    }
  };

  const preview = () => {
    navigate(`/certificate/${courseId}`);
  };

  if (loading) return <BookLoader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
        <div className="flex items-center space-x-4 mb-6">
          <button
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg"
            onClick={nextpage}
          >
            Enroll Now
          </button>
        </div>

        <div className="mt-8">
          <img
            src={course.thumbnail_pic_link}
            alt={course.title}
            className="w-full h-auto object-cover mb-4
              sm:w-[80%] sm:max-h-[200px]   
              md:w-[75%] md:max-h-[300px]   
              lg:w-[70%] lg:max-h-[400px]"
          />
          <p className="text-lg text-gray-700 mb-4"><strong>Description:</strong> {course.description}</p>
          <p className="text-lg text-gray-700 mb-4"><strong>Price:</strong> ₹{course.price}</p>
          <p className="text-lg text-gray-700 mb-4"><strong>Enrollment Count:</strong> {course.Enrollment_Counts}</p>
          <p className="text-lg text-gray-700 mb-4">
            <strong>Certificate Preview:</strong> <Link onClick={preview}>View Preview</Link>
          </p>
          <p className="text-lg text-gray-700 mb-4"><strong>Course Type:</strong> {course.course_type}</p>
          <p className="text-lg text-gray-700 mb-4"><strong>Points Providing:</strong> {course.points_providing}</p>
          <p className="text-lg text-gray-700 mb-4"><strong>Rate:</strong> {course.Rate}</p>
          <p className="text-lg text-gray-700 mb-4"><strong>Course Level:</strong> {course.course_level}</p>
          <p className="text-lg text-gray-700 mb-4"><strong>Number of Ratings:</strong> {course.number_of_people_rated}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;