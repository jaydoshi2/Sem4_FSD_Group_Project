import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(90);
  const myIP = import.meta.env.VITE_MY_IP;

  useEffect(() => {
    // Countdown logic
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer); // Clear timeout on component unmount
    } else {
      setMessage('Session timed out. Please request a new password reset link.');
    }
  }, [timeLeft]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (timeLeft <= 0) {
      setMessage('Session timed out. Please request a new password reset link.');
      return;
    }

    try {
      const url = `http://${myIP}:3000/auth/reset-password/${resetToken}`;
      await axios.post(url, { password });
      setMessage('Password has been reset successfully!');
    } catch (error) {
      setTimeLeft(0)
      setMessage('Error resetting password. Please try again.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <p>Time left to reset your password: {timeLeft} seconds</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={timeLeft <= 0}>Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
