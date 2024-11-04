import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import BookLoader from "../components/BookLoader";
import { useAuthUser } from '../contexts/AuthUserContexts';

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const myIP = import.meta.env.VITE_MY_IP;
  const { login } = useAuthUser();

  useEffect(() => {
    handleRedirect();
  }, []);

  const handleRedirect = () => {
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');
    if (userId) {
      login({ userId: userId });
      navigate("/");
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const url = `http://${myIP}:3000/auth/login`;

      const response = await axios.post(url, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Successful login
      if (response.data) {
        await login(response.data.user);
        toast.success("Logged in successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });

        // Small delay to allow toast to be visible before navigation
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }

    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        const errorMessage = error.response.data.message;

        if (errorMessage === 'Email not found') {
          toast.error("Email not found. Please check and try again.", {
            position: "top-right",
            autoClose: 3000
          });
        } else if (errorMessage === 'Incorrect password') {
          toast.error("Incorrect password. Please try again.", {
            position: "top-right",
            autoClose: 3000
          });
        } else {
          toast.error(errorMessage || "Login failed. Please try again.", {
            position: "top-right",
            autoClose: 3000
          });
        }
        setError(errorMessage || "An error occurred during login");
      } else {
        toast.error("An unexpected error occurred. Please try again.", {
          position: "top-right",
          autoClose: 3000
        });
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    flow: 'implicit',
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post(`http://${myIP}:3000/api/auth/google`, {
          token: tokenResponse.access_token,
        });
        await login(res.data.user);
        toast.success("Google login successful!", {
          position: "top-right",
          autoClose: 3000
        });
        navigate('/');
      } catch (err) {
        console.error(err);
        toast.error("Google Sign-In failed. Please try again.", {
          position: "top-right",
          autoClose: 3000
        });
        setError("Google Sign-In failed. Please try again.");
      }
    },
    onError: (error) => {
      console.log('Login Failed:', error);
      toast.error("Google Sign-In failed. Please try again.", {
        position: "top-right",
        autoClose: 3000
      });
      setError("Google Sign-In failed. Please try again.");
    }
  });

  if (loading) return <BookLoader />;

  return (
    <div className="flex flex-col items-center min-h-screen bg-indigo-50 px-4 pt-8">
      <ToastContainer />
      <h1 className="text-[#324aad] text-3xl md:text-4xl font-bold relative inline-block pb-2.5 mb-6">
        Login
        <span className="block w-16 h-0.5 bg-[#5c8bf5] mx-auto mt-2"></span>
      </h1>

      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg w-full max-w-4xl border border-indigo-950 mt-20 mb-20 p-4 md:p-0">
        <div className="flex flex-col justify-center items-center flex-2 bg-indigo-300 p-8 rounded-l-lg">
          <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
            <h1 className="text-4xl font-bold text-indigo-500 mb-6">Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="w-full max-w-md p-4 mb-4 rounded-lg bg-indigo-50 outline-none text-gray-700"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="w-full max-w-md p-4 mb-4 rounded-lg bg-indigo-50 outline-none text-gray-700"
            />
            <button type="submit" className="bg-indigo-50 text-blue-500 py-3 px-6 rounded-full font-bold hover:bg-gray-100 transition duration-300">
              Sign In
            </button>
            <Link to="/forgot-password" className="mt-4 text-sm text-indigo-50 underline">
              Forgot Password?
            </Link>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center flex-1 bg-indigo-200 p-8 rounded-r-lg">
          <h1 className="text-4xl font-bold text-blue-500 mb-6">New Here?</h1>
          <Link to="/signup">
            <button className="bg-indigo-400 text-indigo-50 py-3 px-6 rounded-full font-bold hover:bg-blue-600 transition duration-300">
              Sign Up
            </button>
          </Link>
          <button
            onClick={() => googleLogin()}
            className="w-full bg-white text-gray-800 font-medium py-2 px-4 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign In With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;