// import React, { useState, useEffect } from 'react';
// import '../styles/Profile.css';
// import axios from 'axios';

// const Profile = () => {
//   const [isEditingAll, setIsEditingAll] = useState(false);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     first_name: '',
//     last_name: '',
//     bio: '',
//     birthDate: '',
//     profilePic: '',
//   });
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchUserDetails();
//   }, []);

//   const fetchUserDetails = async () => {
//     const MY_IP = import.meta.env.VITE_MY_IP;
//     try {
//       const storedUser = JSON.parse(localStorage.getItem('user'));
      
//       if (!storedUser || !storedUser.user_id) {
//         throw new Error('No user data found in local storage');
//       }

//       const response = await axios.post(`http://${MY_IP}:3000/profile/getuser`, {
//         userId: storedUser.user_id
//       });

//       setFormData({
//         username: response.data.username || '',
//         email: response.data.email || '',
//         first_name: response.data.first_name || '',
//         last_name: response.data.last_name || '',
//         bio: response.data.bio || '',
//         birthDate: response.data.birthDate ? new Date(response.data.birthDate).toISOString().split('T')[0] : '',
//         profilePic: response.data.profilePic || 'https://via.placeholder.com/150',
//       });
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       setError(error.message || 'An error occurred while fetching user data');
//     }
//   };

//   const handleMainEditToggle = () => {
//     setIsEditingAll(!isEditingAll);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async () => {
//     const MY_IP = import.meta.env.VITE_MY_IP;
//     try {
//       const storedUser = JSON.parse(localStorage.getItem('user'));
      
//       if (!storedUser || !storedUser.user_id) {
//         throw new Error('No user data found in local storage');
//       }

//       await axios.post(`http://${MY_IP}:3000/profile/update`, {
//         userId: storedUser.user_id,
//         ...formData
//       });

//       setIsEditingAll(false);
//       // Optionally, you can fetch user details again to confirm the update
//       // fetchUserDetails();
//     } catch (error) {
//       console.error('Error updating user data:', error);
//       setError(error.message || 'An error occurred while updating user data');
//     }
//   };

//   if (error) return <div className="error-message">{error}</div>;

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <img
//           src={formData.profilePic}
//           alt="Profile"
//           className="profile-img"
//         />
//       </div>
//       <div className="profile-details">
//         {Object.entries(formData).map(([key, value]) => (
//           key !== 'profilePic' && (
//             <div className="profile-field" key={key}>
//               <label>{key.charAt(0).toUpperCase() + key.slice(1)}: </label>
//               {isEditingAll ? (
//                 <input
//                   type={key === 'birthDate' ? 'date' : 'text'}
//                   name={key}
//                   value={value}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <span>{value}</span>
//               )}
//             </div>
//           )
//         ))}
//       </div>
//       {!isEditingAll ? (
//         <button className="main-edit-btn" onClick={handleMainEditToggle}>
//           Edit Profile
//         </button>
//       ) : (
//         <button className="submit-btn" onClick={handleSubmit}>Submit</button>
//       )}
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Profile.css';

const Profile = () => {
  const [isEditingAll, setIsEditingAll] = useState(false);
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
        // Request a presigned URL from backend
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

        // Upload the image to S3
        await axios.post(presignedUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        // Update the profilePic URL in state
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
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={formData.profilePic}
          alt="Profile"
          className="profile-img"
        />
        {isEditingAll && (
          <input
            type="file"
            accept="image/jpeg, image/png, image/gif"
            onChange={handleImageUpload}
            disabled={uploading}
          />
        )}
      </div>
      <div className="profile-details">
        {Object.entries(formData).map(([key, value]) => (
          key !== 'profilePic' && (
            <div className="profile-field" key={key}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}: </label>
              {isEditingAll ? (
                <input
                  type={key === 'birthDate' ? 'date' : 'text'}
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{value}</span>
              )}
            </div>
          )
        ))}
      </div>
      {!isEditingAll ? (
        <button className="main-edit-btn" onClick={handleMainEditToggle}>
          Edit Profile
        </button>
      ) : (
        <button className="submit-btn" onClick={handleSubmit} disabled={uploading}>
          {uploading ? 'Submitting...' : 'Submit'}
        </button>
      )}
    </div>
  );
};

export default Profile;
