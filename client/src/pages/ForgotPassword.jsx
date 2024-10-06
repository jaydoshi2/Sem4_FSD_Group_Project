import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const myIP = import.meta.env.VITE_MY_IP;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url =`http://${myIP}:3000/auth/forgot-password`;
      const response = await axios.post(url, { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Forgot Password
        </h1>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        {message && (
          <div
            className={`mt-4 text-center ${message.includes("error")
                ? "text-red-500"
                : "text-green-500"
              }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;