import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookLoader from '../components/BookLoader';
 
import { useAuthUser } from '../contexts/AuthUserContexts';

const Profile = () => {
  const [isEditingAll, setIsEditingAll] = useState(false);
  const [loading, setLoading] = useState(true);
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
  const { user, updateUser } = useAuthUser();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const MY_IP = import.meta.env.VITE_MY_IP;
    try {
      if (!user || !user.userId) {
        throw new Error('No user data found');
      }

      const response = await axios.post(`http://${MY_IP}:3000/profile/getuser`, {
        userId: user.userId
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
  
  if (loading) return <BookLoader/>


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
      if (!user || !user.userId) {
        throw new Error('No user data found');
      }

      const response = await axios.put(`http://${MY_IP}:3000/profile/update`, {
        userId: user.userId,
        ...formData
      });
      updateUser({
        ...user,
        first_name: formData.first_name,
        profilePic: formData.profilePic
      });

      setIsEditingAll(false);
      fetchUserDetails(); // Refresh the profile data after update
    } catch (error) {
      console.error('Error updating user data:', error);
      setError(error.message || 'An error occurred while updating user data');
    }
    setUploading(false);
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mt-4"> {/* Added margin-top */}
        <div className="flex flex-col md:flex-row items-start mb-4"> {/* Reduced margin-bottom */}
          {/* Profile Picture and Basic Info */}
          <div className="flex-shrink-0 text-center mb-4 md:mb-0 md:w-1/3">
            <img
              src={formData.profilePic}
              alt="Profile"
              className="rounded-full w-32 h-32 border-4 border-blue-500 shadow-lg mx-auto"
            />
            <h2 className="text-xl font-bold text-gray-800 mt-2">{formData.first_name} {formData.last_name}</h2>
            <p className="text-gray-600 mt-1">Student ID: <span className="font-semibold">321000001</span></p>
            <p className="text-gray-600 mt-1">Class: <span className="font-semibold">4</span></p>
            <p className="text-gray-600 mt-1">Section: <span className="font-semibold">A</span></p>

            {isEditingAll && (
              <input
                type="file"
                accept="image/jpeg, image/png, image/gif"
                onChange={handleImageUpload}
                disabled={uploading}
                className="mt-4 text-sm text-gray-600 border border-blue-500 rounded-md p-2 block w-full"
              />
            )}
          </div>

          {/* General Information */}
          <div className="md:w-2/3 mt-4 md:mt-0 md:ml-8"> {/* Reduced margin-top */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">General Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(formData).map(([key, value]) => (
                key !== 'profilePic' && key !== 'bio' && (  // Remove bio from here
                  <div key={key} className="flex flex-col p-1"> {/* Reduced padding */}
                    <label className="font-bold text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                    {isEditingAll ? (
                      <input
                        type={key === 'birthDate' ? 'date' : 'text'}
                        name={key}
                        value={value}
                        onChange={handleInputChange}
                        className="border border-blue-500 rounded-md px-2 py-1 w-full"
                      />
                    ) : (
                      <span className="text-gray-800">{value}</span>
                    )}
                  </div>
                )
              ))}
            </div>

            {/* Editable Bio Section */}
            <div className="mt-4"> {/* Reduced margin-top */}
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Bio</h3>
              {isEditingAll ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="border border-blue-500 rounded-md px-3 py-1 w-full h-20 resize-none" // Adjusted height
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-600">{formData.bio || 'No bio available.'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Edit/Submit Button */}
        <div className="flex justify-center mt-4"> {/* Adjusted margin-top */}
          {!isEditingAll ? (
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
              onClick={handleMainEditToggle}
            >
              Edit Profile
            </button>
          ) : (
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
              onClick={handleSubmit}
              disabled={uploading}
            >
              {uploading ? 'Submitting...' : 'Submit'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
