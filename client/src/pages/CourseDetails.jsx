import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookLoader from '../components/BookLoader';

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
      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-lg p-8 mt-16">
        {/* Title Section */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {course.title}
        </h1>
  
        <div className="flex mb-6">
          {/* Left Side: Title, Description, and Enroll Button */}
          <div className="flex-1 pr-4">
            <p className="text-lg text-gray-700 mb-4">
              <strong>Description:</strong> {course.description}
            </p>
            <div className="flex items-center space-x-4 mb-6">
              <button
                className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg"
                onClick={nextpage}
              >
                Enroll Now
              </button>
            </div>
          </div>
  
          {/* Right Side: Image Section */}
          <div className="flex-none w-1/3">
            <img
              src={course.thumbnail_pic_link}
              alt={course.title}
              className="w-full h-auto object-cover rounded-md max-h-64 lg:max-h-72"
            />
          </div>
        </div>
  
        {/* Additional Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center mt-8">
          <div className="border-r-2 pr-4">
            <a href="#" className="text-blue-600 font-bold text-lg hover:underline">
              4 modules
            </a>
            <p className="text-gray-500 text-sm mt-1">
              Gain insight into a topic and learn the fundamentals.
            </p>
          </div>
          <div className="border-r pr-4">
            <p className="text-2xl font-bold text-gray-900">4.8 ★</p>
            <p className="text-gray-500 text-sm mt-1">(58 reviews)</p>
          </div>
          <div className="border-r pr-4">
            <p className="text-2xl font-bold text-gray-900">3 hours to complete</p>
            <p className="text-gray-500 text-sm mt-1">
              3 weeks at 1 hour a week
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">Flexible schedule</p>
            <p className="text-gray-500 text-sm mt-1">Learn at your own pace</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  
}

export default CourseDetail;