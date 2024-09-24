import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../styles/Profile.css';

const Profile = () => {
  const [isEditingAll, setIsEditingAll] = useState(false);
  const [loading, setLaoding] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    bio: '',
    birthDate: '',
    profilePic: '',
  });
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const MY_IP = import.meta.env.VITE_MY_IP;
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (!storedUser || !storedUser.user_id) {
        throw new Error('No user data found in local storage');
      }

      const response = await axios.post(`http://${MY_IP}:3000/profile/getuser`, {
        userId: storedUser.user_id
      });

      setFormData({
        username: response.data.username || '',
        email: response.data.email || '',
        first_name: response.data.first_name || '',
        last_name: response.data.last_name || '',
        bio: response.data.bio || '',
        birthDate: response.data.birthDate ? new Date(response.data.birthDate).toISOString().split('T')[0] : '',
        profilePic: response.data.profilePic || 'https://via.placeholder.com/150',
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error.message || 'An error occurred while fetching user data');
    }
  };

  const handleMainEditToggle = () => {
    setIsEditingAll(!isEditingAll);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      setImageFile(file);

      if (file) {
        const MY_IP = import.meta.env.VITE_MY_IP;
        const mimeType = file.type;
        const response = await axios.get(`http://${MY_IP}:3000/auth/presignedurl`, {
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
        formData.append("file", file);

        await axios.post(presignedUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        const imageUrl = `${import.meta.env.VITE_CLOUDFRONT_URL}/${response.data.fields["key"]}`;
        setFormData(prevData => ({ ...prevData, profilePic: imageUrl }));
      }
    } catch (error) {
      console.error("Error handling image upload:", error);
      setError("Failed to handle image upload. Please try again.");
    }
  };

  const handleSubmit = async () => {
    setUploading(true);
    const MY_IP = import.meta.env.VITE_MY_IP;
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (!storedUser || !storedUser.user_id) {
        throw new Error('No user data found in local storage');
      }

      await axios.put(`http://${MY_IP}:3000/profile/update`, {
        userId: storedUser.user_id,
        ...formData
      });

      setIsEditingAll(false);
      fetchUserDetails(); // Refresh the profile data after update
    } catch (error) {
      console.error('Error updating user data:', error);
      setError(error.message || 'An error occurred while updating user data');
    }
    setUploading(false);
  };

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-300 to-green-300 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">Student Profile</h1>

      <div className="flex flex-col md:flex-row items-center justify-between md:space-x-8 space-y-6 md:space-y-0">
        {/* Profile Picture and Basic Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/3 text-center">
          <img
            src={formData.profilePic}
            alt="Profile"
            className="rounded-full w-32 h-32 mx-auto mb-4"
          />
          <h2 className="text-xl font-bold">{formData.first_name} {formData.last_name}</h2>
          <p className="text-gray-600">Student ID: 321000001</p>
          <p className="text-gray-600">Class: 4</p>
          <p className="text-gray-600">Section: A</p>

          {isEditingAll && (
            <input
              type="file"
              accept="image/jpeg, image/png, image/gif"
              onChange={handleImageUpload}
              disabled={uploading}
              className="mt-4"
            />
          )}
        </div>

        {/* General Information */}
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4">General Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(formData).map(([key, value]) => (
                key !== 'profilePic' && (
                  <div key={key} className="flex justify-between">
                    <span className="font-bold">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                    {isEditingAll ? (
                      <input
                        type={key === 'birthDate' ? 'date' : 'text'}
                        name={key}
                        value={value}
                        onChange={handleInputChange}
                        className="border rounded-md px-2 py-1 w-full"
                      />
                    ) : (
                      <span>{value}</span>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Editable Bio Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Bio</h3>
            {isEditingAll ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="border rounded-md px-2 py-1 w-full h-24"
              />
            ) : (
              <p className="text-gray-600">{formData.bio || 'No bio available.'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Edit/Submit Button */}
      {!isEditingAll ? (
        <button
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full md:w-auto"
          onClick={handleMainEditToggle}
        >
          Edit Profile
        </button>
      ) : (
        <button
          className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full md:w-auto"
          onClick={handleSubmit}
          disabled={uploading}
        >
          {uploading ? 'Submitting...' : 'Submit'}
        </button>
      )}
    </div>

  );
};

export default Profile;
