import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import "../styles/Login.css";
import BookLoader from "../components/BookLoader";
import { useUser } from '../contexts/UserContexts';

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const myIP = import.meta.env.VITE_MY_IP;
  const { login } = useUser();

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
    setLoading(true);
    try {
      const url = `http://${myIP}:3000/auth/login`;
      const response = await axios.post(url, data, { withCredentials: true });
      await login(response.data.user);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
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
        navigate('/');
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

  if (loading) return <BookLoader />;

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