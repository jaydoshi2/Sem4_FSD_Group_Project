import React, { useState } from "react";
import axios from "axios";
// import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const myIP = import.meta.env.VITE_MY_IP;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://${myIP}:3000/auth/forgot-password`;
      const response = await axios.post(url, { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="forgot_password_container">
      <form className="form_container" onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          className="input"
        />
        <button type="submit" className="green_btn">
          Send Reset Link
        </button>
        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
};

export default ForgotPassword;
