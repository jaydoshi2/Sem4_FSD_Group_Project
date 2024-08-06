import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Ensure this path is correct

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const myIP = import.meta.env.VITE_MY_IP
    console.log(myIP)
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await axios.get(`http://${myIP}:3000/auth/check-auth`, { withCredentials: true });
            if (response.data.isAuthenticated) {
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
          const response = await axios.post(url, data, { withCredentials: true });
          
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/Course");
        } catch (error) {
          if (error.response && error.response.status >= 400 && error.response.status <= 500) {
            setError(error.response.data.message);
          }
        }
      };
      
      const loginWithGoogle = () => {
        window.open(`http://${myIP}:3000/auth/google`, "_self");
      };

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
                    </form>
                </div>
                <div className="right">
                    <h1>New Here?</h1>
                    <Link to="/signup">
                        <button type="button" className="white_btn">
                            Sign Up
                        </button>
                    </Link>
                    <button className="login_with_google_btn" onClick={loginWithGoogle}>
                        Sign In With Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
