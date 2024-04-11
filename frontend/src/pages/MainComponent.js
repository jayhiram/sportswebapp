// MainComponent.js

import React, { useState } from 'react';
import UserProfile from '../components/UserProfile';
import Gallery from '../components/Gallery';

const MainComponent = () => {
  const [userDetails, setUserDetails] = useState({
    username: 'janehiram', // Initialize with default values or fetch from some source
    profilePicture: '', // Initialize with default values or fetch from some source
  });

  return (
    <div>
      <UserProfile setUserDetails={setUserDetails} />
      <Gallery username={userDetails.username} profilePicture={userDetails.profilePicture} />
    </div>
  );
};

export default MainComponent;
