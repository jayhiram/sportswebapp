import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({
    profilePicture: '',
    username: '',
    email: '',
    selectedSport: '',
    bio: '',
    isEditing: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserDetails({ ...userDetails, profilePicture: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setUserDetails({ ...userDetails, isEditing: false });
    console.log("User details saved:", userDetails);
  };

  const handleEdit = () => {
    setUserDetails({ ...userDetails, isEditing: true });
  };

  const sportsList = ['Football', 'Basketball', 'Tennis', 'Baseball', 'Soccer'];

  return (
    <div className="user-profile">
      <div className="profile-picture">
        {userDetails.isEditing ? (
          <>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {userDetails.profilePicture ? (
              <>
                <img src={userDetails.profilePicture} alt="Profile" />
                <div className="update-profile-icon">
                  <label htmlFor="upload-image">
                    <FontAwesomeIcon icon={faCamera} />
                  </label>
                </div>
              </>
            ) : (
              <div className="upload-text">Upload a Profile Picture</div>
            )}
          </>
        ) : (
          <img src={userDetails.profilePicture} alt="Profile" />
        )}
      </div>
      <div className="details">
        {userDetails.isEditing ? (
          <>
            <div className="input-group">
              <label htmlFor="username">Name:</label>
              <input type="text" name="username" value={userDetails.username} onChange={handleInputChange} placeholder="Your name" />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" value={userDetails.email} onChange={handleInputChange} placeholder="Your email" />
            </div>
            <div className="input-group">
              <label htmlFor="selectedSport">Favourite Sport:</label>
              <select name="selectedSport" value={userDetails.selectedSport} onChange={handleInputChange}>
                <option value="">Select Sport</option>
                {sportsList.map((sport) => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="bio">Bio:</label>
              <textarea name="bio" value={userDetails.bio} onChange={handleInputChange} placeholder="Type your bio..." />
            </div>
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <h2>{userDetails.username}</h2>
            <p>{userDetails.email}</p>
            <h3>Favourite Sport</h3>
            <p>{userDetails.selectedSport}</p>
            <h3>Bio</h3>
            <p>{userDetails.bio}</p>
          </>
        )}
      </div>
      <div className="edit-profile">
        {userDetails.isEditing ? null : <button onClick={handleEdit}>Edit Profile</button>}
      </div>
    </div>
  );
};

export default UserProfile
