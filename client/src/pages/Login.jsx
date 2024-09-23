import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import "../styles/Login.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const myIP = import.meta.env.VITE_MY_IP;

  useEffect(() => {
    checkAuthStatus();
    handleRedirect();
  }, []);

  const handleRedirect = () => {
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');
    if (userId) {
      localStorage.setItem("user", JSON.stringify({ user_id: userId }));
      navigate("/Course");
    }
  };

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`http://${myIP}:3000/auth/check-auth`, { withCredentials: true });
      console.log(response.data.isAuthenticated);
      if (response.data.isAuthenticated) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/Course");
      }
    } catch (error) {
      console.error("Auth check failed", error);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://${myIP}:3000/auth/login`;
      const response = await axios.post(url, data, { withCredentials: true })
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/Course");
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };
  const googleLogin = useGoogleLogin({
    flow: 'implicit',
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post(`http://${myIP}:3000/api/auth/google`, {
          token: tokenResponse.access_token,
        });
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/Course');
      } catch (err) {
        console.error(err);
        setError("Google Sign-In failed. Please try again.");
      }
    },
    onError: (error) => {
      console.log('Login Failed:', error);
      setError("Google Sign-In failed. Please try again.");
    }
  });

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="input"
            />
            {error && <div className="error_msg">{error}</div>}
            <button type="submit" className="green_btn">
              Sign In
            </button>
            <Link to="/forgot-password" className="forgot_password_link">
              Forgot Password?
            </Link>
          </form>
        </div>
        <div className="right">
          <h1>New Here?</h1>
          <Link to="/signup">
            <button type="button" className="white_btn">
              Sign Up
            </button>
          </Link>
          <button className="login_with_google_btn" onClick={() => googleLogin()}>
            Sign In With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;