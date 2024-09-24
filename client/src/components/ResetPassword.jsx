import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(90); // default time
  const [isError, setIsError] = useState(false);
  const myIP = import.meta.env.VITE_MY_IP;

  // Sync localStorage with session expiry
  useEffect(() => {
    const expirationTime = localStorage.getItem('resetTokenExpiration');
    const currentTime = Date.now();

    if (expirationTime) {
      const timeDiff = Math.floor((expirationTime - currentTime) / 1000);
      if (timeDiff > 0) {
        setTimeLeft(timeDiff); // Set remaining time
      } else {
        setMessage('Session timed out. Please request a new password reset link.');
        setIsError(true);
        setTimeLeft(0);
      }
    }

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setMessage('Session timed out. Please request a new password reset link.');
      setIsError(true);
    }
  }, [timeLeft]);

  const validatePassword = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(pass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (timeLeft <= 0) {
      setMessage('Session timed out. Please request a new password reset link.');
      setIsError(true);
      return;
    }

    if (!validatePassword(password)) {
      setMessage('Password must be at least 8 characters long and include a lowercase letter, a number, and a special character.');
      setIsError(true);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setIsError(true);
      return;
    }

    try {
      const url = `http://${myIP}:3000/auth/reset-password/${resetToken}`;
      await axios.post(url, { password });

      setMessage('Password has been reset successfully!');
      setIsError(false);
      // Clear localStorage upon successful reset
      localStorage.removeItem('resetTokenExpiration');
    } catch (error) {
      setTimeLeft(0);
      setMessage('Error resetting password. Please try again.');
      setIsError(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Reset Password</h2>
        <p className="text-center mb-4">Time left to reset your password: <span className="font-bold">{timeLeft}</span> seconds</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={timeLeft <= 0}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset Password
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-sm ${isError ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
