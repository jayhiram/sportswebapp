import React from 'react';

import '../styles/Logout.css';

function Logout() {
  const handleLogout = () => {
    // Handle logout logic here
    // For example, clear user session or perform any necessary logout tasks
    // After logout, redirect to homepage
    window.location.href = 'http://localhost:3000/'; // Redirect to the homepage
  };

  const goBack = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    <div className="logout-container">
      <p>Are you sure you want to logout?</p>
      <button onClick={handleLogout}>Yes</button>
      <button onClick={goBack}>No</button>
    </div>
  );
}

export default Logout;
