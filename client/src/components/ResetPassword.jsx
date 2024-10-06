import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  console.log('Token from URL:', token); // Add this line to log the token
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const myIP = import.meta.env.VITE_MY_IP;

  // const validatePassword = (pass) => {
  //   const regex =/^(?=.[a-z])(?=.\d)(?=.[!@#$%^&()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;
  //   return regex.test(pass);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!validatePassword(password)) {
    //   setMessage('Password must be at least 8 characters long and include a lowercase letter, a number, and a special character.');
    //   setIsError(true);
    //   return;
    // }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setIsError(true);
      return;
    }


    try {
      console.log(token)
      const url = `http://${myIP}:3000/auth/reset-password/${token}`;
        await axios.post(url, { password });

      setMessage('Password has been reset successfully!');
      setIsError(false);
    } catch (error) {
      setMessage('Error resetting password. The link may have expired. Please request a new password reset link.');
      setIsError(true);

    };
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset Password
          </button>
        </form>
        {message && (
          <p className={`mt - 4 text-sm ${isError ? 'text-red-600' : 'text-green-600'}`}>
        {message}
      </p>
        )}
    </div>
    </div >
  );
};

export default ResetPassword;