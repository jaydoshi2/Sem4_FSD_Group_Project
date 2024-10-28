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
          <button onClick={() => googleLogin()} className="mt-4 bg-indigo-400 py-3 px-6 rounded-full font-bold text-indigo-50 shadow hover:shadow-lg transition duration-300 flex items-center justify-center">
            Sign In With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;