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
  useEffect(() => { console.log("in course display") }, [])
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
      console.log("coming here")
      const { chapter_id, video_id } = navigationData;
      console.log('Navigating to video page with data:', { courseId, chapter_id, video_id });
      navigate(`/video?course_id=${courseId}&chapter_id=${chapter_id}&video_id=${video_id}`);
    }
  }, [navigationData, courseId, navigate]);

  const nextpage = async () => {
    setLoading(true);
    setError(null);

    try {
      const orderUrl = `http://${myIP}:3000/user/make-payment`;
      const response = await axios.post(orderUrl, {
        amount,
        currency: 'INR',
        receipt: 'receipt#1',
      });

      const { id, amount: orderAmount, currency } = response.data;

      if (window.Razorpay) {
        const options = {
          key: 'rzp_test_pVMPiZnpHDsa6g',
          amount: orderAmount,
          currency,
          name: 'Your Company Name',
          description: 'Course Enrollment',
          order_id: id,
          handler: async function (paymentResponse) {
            try {
              const response = await axios.post(`http://${myIP}:3000/user/enroll-course`, {
                userId,
                courseId,
              });

              if (response) {
                const response1 = await axios.get(`http://${myIP}:3000/from/first-chapter-video/${courseId}`);
                const data = response1.data;

                if (response1.status === 200 && data) {
                  setNavigationData(data);
                } else {
                  setError('Failed to fetch course content');
                }
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
          modal: {
            ondismiss: handlePaymentCancel
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

        rzp.on('payment.failed', function (response) {
          console.error('Payment failed:', response);
          setError('Payment failed. Please try again.');
          setLoading(false);
        });
      } else {
        setError('Unable to initiate payment. Please try again later.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error making payment request:', error);
      setError('Failed to initiate payment. Please try again.');  
      setLoading(false);
    }
  };

  const handlePaymentCancel = () => {
    setLoading(false);
    setError('Payment was cancelled');
    navigate(`/courseDetails?course_id=${courseId}`);
    window.location.reload()
  };
  const preview = () => {
    navigate(`/certificatepreview/${courseId}`);
  };

  if (loading) return <BookLoader />;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className='mt-28'>
      <div className="bg-indigo-100 min-h-screen -mt-16 p-6 flex justify-center items-center">
        {/* Main Content Wrapper */}
        <div className="bg-indigo-50 rounded-lg shadow-lg p-8 border border-indigo-950">
          {/* Parallel Layout: Course Details and Image */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
            {/* Course Details */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-gray-800 mb-4">
                <strong>Description:</strong> {course.description}
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <button className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg" onClick={nextpage}>
                  Enroll now
                </button>
              </div>
              <p className="text-lg text-gray-800">
                <strong>Course Type:</strong> {course.course_type}
              </p>
              <strong>Enrollment count :  </strong>{course.Enrollment_Counts}
              <p className="text-lg text-gray-800">
                <strong>Points Providing:</strong> {course.points_providing}
              </p>
              <p className="text-lg text-gray-800">
                <strong>Price:</strong> ₹{course.price}
              </p>
              <p className="text-lg text-gray-700 mb-6">
              </p>
            </div>

            {/* Image on Right */}
            <div className="w-full lg:w-1/3">
              <img
                src={course.thumbnail_pic_link}
                alt={course.title}
                draggable="false"  // Prevent dragging
                className="w-full h-72 object-cover rounded-xl shadow-md mb-6"
              />

            </div>
          </div>

          {/* Additional Info Grid - Appears Below the Parallel Content */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center border-r border-indigo-300 pr-4">
              <p className="text-gray-500 text-sm mt-1">
                Certificate Preview:
              </p>
              <div
                className="text-blue-600 font-bold text-lg hover:underline cursor-pointer"
                onClick={preview}
              >
                View certificate
              </div>

            </div>
            <div className="text-center border-r border-indigo-300 pr-4">
              <p className="text-2xl font-bold text-gray-900">{course.Rate} ★</p>
              <p className="text-gray-500 text-sm mt-1">
                ({course.number_of_people_rated} reviews)
              </p>
            </div>
            <div className="text-center border-r border-indigo-300 pr-4">
              <p className="text-2xl font-bold text-gray-900">Course Level:</p>
              <p className="text-gray-500 text-sm mt-1">{course.course_level}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                Flexible schedule
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Learn at your own pace
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;