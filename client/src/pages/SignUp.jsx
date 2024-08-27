import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import defaultProfilePic from "../images/profile.png";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Replace with your actual backend URL
const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL; // Replace with your actual CloudFront URL

const Signup = () => {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    profilePic: "",
    username: "",  // Added username field
  });
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null); // Added state to store the image file
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true); // Set uploading to true when form is submitted
    try {
        let updatedData = { ...data }; // Copy the data object

        // Upload the image if an image file is selected
        if (imageFile) {
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
            updatedData = { ...updatedData, profilePic: imageUrl }; // Update profilePic in the copied data object
        }

        // Submit the form data with the updated data object
        const url = `${BACKEND_URL}/auth/signup`;
        await axios.post(url, updatedData);
        navigate("/login");
    } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
            setError(error.response.data.message);
        }
    }
    setUploading(false); // Set uploading to false when the process is complete
};



  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      setImageFile(file);
      let profilePic = document.getElementById("profile-pic");
      profilePic.src = URL.createObjectURL(file);
    } catch (error) {
      console.error("Error handling image upload:", error);
      setError("Failed to handle image upload. Please try again.");
    }
  };

  return (
    <div className="signup_container">
      <div className="signup_form_container">
        <div className="left">
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className="white_btn">
              Sign in
            </button>
          </Link>
          <div className="card">
            <h1>UPLOAD YOUR IMAGE HERE</h1>
            <img src={data.profilePic || defaultProfilePic} alt="Profile" id="profile-pic"></img>
            <label htmlFor="input-file">
              {uploading ? "Uploading..." : "Upload image"}
            </label>
            <input
              type="file"
              accept="image/jpeg, image/png, image/gif"
              className="input_file"
              id="input-file"
              name="file"
              onChange={handleImageUpload}
              disabled={uploading}
            ></input>
          </div>
        </div>
        <div className="right">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              onChange={handleChange}
              value={data.first_name}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              onChange={handleChange}
              value={data.last_name}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={data.username}
              required
              className="input"
            />
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
            <button type="submit" className="green_btn" disabled={uploading}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
