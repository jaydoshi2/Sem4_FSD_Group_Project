import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import defaultProfilePic from "../assets/images/profile.png";
import BookLoader from "../components/BookLoader";

const Signup = () => {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    profilePic: "",
    username: "",
  });
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;
  const myIP = import.meta.env.VITE_MY_IP;

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`http://${myIP}:3000/auth/check-auth`, { withCredentials: true });
      if (response.data.isAuthenticated) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        setIsAuthenticated(true);
        toast.info("You're already logged in!", {
          position: "top-right",
          autoClose: 3000
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Auth check failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    // Password validation
    if (data.password.length < 6) {
      toast.error("Password must be at least 6 characters long", {
        position: "top-right",
        autoClose: 3000
      });
      setUploading(false);
      return;
    }

    try {
      let updatedData = { ...data };

      if (imageFile) {
        toast.info("Uploading image...", {
          position: "top-right",
          autoClose: 2000
        });

        const mimeType = imageFile.type;
        const response = await axios.get(`${BACKEND_URL}/auth/presignedurl`, {
          params: { mimeType }
        });

        const presignedUrl = response.data.url;
        const formData = new FormData();

        formData.append("bucket", response.data.fields["bucket"]);
        formData.append("Content-Type", mimeType);
        formData.append("X-Amz-Algorithm", response.data.fields["X-Amz-Algorithm"]);
        formData.append("X-Amz-Credential", response.data.fields["X-Amz-Credential"]);
        formData.append("X-Amz-Date", response.data.fields["X-Amz-Date"]);
        formData.append("Policy", response.data.fields["Policy"]);
        formData.append("X-Amz-Signature", response.data.fields["X-Amz-Signature"]);
        formData.append("key", response.data.fields["key"]);
        formData.append("file", imageFile);

        await axios.post(presignedUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        const imageUrl = `${CLOUDFRONT_URL}/${response.data.fields["key"]}`;
        updatedData = { ...updatedData, profilePic: imageUrl };

        toast.success("Image uploaded successfully!", {
          position: "top-right",
          autoClose: 2000
        });
      }

      const url = `${BACKEND_URL}/auth/signup`;
      await axios.post(url, updatedData);

      toast.success("Account created successfully! Redirecting to login...", {
        position: "top-right",
        autoClose: 2000
      });

      // Delay navigation to allow toast to be visible
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        const errorMessage = error.response.data.message;

        if (errorMessage.includes('Email already exists')) {
          toast.error("This email is already registered. Please use a different email.", {
            position: "top-right",
            autoClose: 3000
          });
        } else {
          toast.error(errorMessage || "Signup failed. Please try again.", {
            position: "top-right",
            autoClose: 3000
          });
        }
        setError(errorMessage);
      } else {
        toast.error("An unexpected error occurred. Please try again.", {
          position: "top-right",
          autoClose: 3000
        });
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];

      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB", {
          position: "top-right",
          autoClose: 3000
        });
        return;
      }

      // Validate file type
      if (!file.type.match(/image\/(jpeg|png|gif)/)) {
        toast.error("Please upload a valid image file (JPEG, PNG, or GIF)", {
          position: "top-right",
          autoClose: 3000
        });
        return;
      }

      setImageFile(file);
      let profilePic = document.getElementById("profile-pic");
      profilePic.src = URL.createObjectURL(file);

      toast.success("Image selected successfully!", {
        position: "top-right",
        autoClose: 2000
      });
    } catch (error) {
      console.error("Error handling image upload:", error);
      toast.error("Failed to handle image upload. Please try again.", {
        position: "top-right",
        autoClose: 3000
      });
      setError("Failed to handle image upload. Please try again.");
    }
  };

  if (loading) return <div><BookLoader /></div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-indigo-50 px-4 pt-10 pb-10">
      <ToastContainer />
      <h1 className="text-[#324aad] text-3xl md:text-4xl font-bold relative inline-block pb-2.5 mb-6">
        SignUp
        <span className="block w-16 h-0.5 bg-[#5c8bf5] mx-auto mt-2"></span>
      </h1>
      <div className="w-full max-w-4xl h-auto md:h-[500px] flex flex-col md:flex-row rounded-lg shadow-lg border border-indigo-950">
        <div className="flex-1 flex flex-col items-center justify-center bg-indigo-400 p-6 md:rounded-l-lg rounded-t-lg md:rounded-t-none">
          <h1 className="text-indigo-50 text-2xl md:text-3xl mb-4 font-black">Welcome Back</h1>
          <Link to="/login">
            <button className="bg-indigo-900 text-indigo-50 rounded-full px-6 py-2 md:px-8 md:py-3 font-bold">
              Sign in
            </button>
          </Link>
          <div className="flex flex-col items-center mt-6">
            <h1 className="text-indigo-50 text-sm md:text-base mb-4">UPLOAD YOUR IMAGE HERE</h1>
            <img
              id="profile-pic"
              src={data.profilePic || defaultProfilePic}
              alt="Profile"
              className="w-24 h-24 md:w-28 md:h-28 rounded-full mb-6"
            />
            <label htmlFor="input-file" className="bg-indigo-900 text-indigo-50 text-center rounded-full px-6 py-2 md:px-8 md:py-3 font-bold cursor-pointer">
              {uploading ? "Uploading..." : "Upload image"}
            </label>
            <input
              type="file"
              accept="image/jpeg, image/png, image/gif"
              id="input-file"
              name="file"
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center bg-indigo-200 p-6 md:rounded-r-lg rounded-b-lg md:rounded-b-none">
          <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
            <h1 className="text-2xl md:text-3xl mb-4 text-indigo-700 font-bold">Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              className="w-full md:w-80 p-4 rounded-lg bg-indigo-50 mb-2 text-base"
              onChange={handleChange}
              value={data.first_name}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              className="w-full md:w-80 p-4 rounded-lg bg-indigo-50 mb-2 text-base"
              onChange={handleChange}
              value={data.last_name}
              required
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="w-full md:w-80 p-4 rounded-lg bg-indigo-50 mb-2 text-base"
              onChange={handleChange}
              value={data.username}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="w-full md:w-80 p-4 rounded-lg bg-indigo-50 mb-2 text-base"
              onChange={handleChange}
              value={data.email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="w-full md:w-80 p-4 rounded-lg bg-indigo-50 mb-2 text-base"
              onChange={handleChange}
              value={data.password}
              required
            />
            <button type="submit" className="bg-indigo-400 text-indigo-50 rounded-full px-6 py-2 md:px-8 md:py-3 font-bold mt-4" disabled={uploading}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;