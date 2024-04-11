import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faCog, faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/Notificationbar.css';

const Notificationbar = ({ onSideItemClick }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [showNotificationBox, setShowNotificationBox] = useState(false);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('notification', (data) => {
      console.log('Received notification:', data);
      setNotificationCount(notificationCount + 1);
      setNotifications([...notifications, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [notificationCount, notifications]);

  const handleNotificationClick = () => {
    setShowNotificationBox(!showNotificationBox);
    setNotificationCount(0); // Reset notification count when notification box is opened
  };

  const handleMessageClick = () => {
    setShowMessageBox(!showMessageBox);
    setMessageCount(0);
  };

  const handleUserIconClick = () => {
    setShowProfileModal(true); // Show profile picture upload modal
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false); // Close profile picture upload modal
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(URL.createObjectURL(file)); // Store the URL of the uploaded picture
  };

  const handleSaveProfilePicture = () => {
    // Perform logic to save the profile picture
    // For now, just log the file object
    console.log('Saving profile picture:', profilePicture);
    // Close the modal
    setShowProfileModal(false);
    // Set the profile picture to be displayed in the navbar
    setProfilePicture(profilePicture);
  };

  const emitNotificationAcknowledgement = () => {
    // Emit an event to acknowledge the notifications
    socket.emit('acknowledgeNotifications');
    // Reset the notification count locally
    setNotificationCount(0);
  };

  return (
    <div className="navbar">
      <div onClick={handleUserIconClick} className='profile-link'>
        {/* Render the uploaded profile picture or default user icon */}
        {profilePicture ? (
          <img
            src={profilePicture} 
            alt="Profile" 
            className={`profile-picture ${profilePicture && 'small'}`}
          />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
        <span className="icon-text"></span>
      </div>

      <div className="icons">
        <div className="icon" style={{ marginRight: '10px' }} onClick={handleNotificationClick}>
          <FontAwesomeIcon icon={faBell} className="iconimg" />
          <div className="counter">{notificationCount}</div>
        </div>
        <div className="icon" style={{ marginRight: '10px' }} onClick={handleMessageClick}>
          <FontAwesomeIcon icon={faEnvelope} className="iconimg" />
          <div className="counter">{messageCount}</div>
        </div>
        <div className="icon">
          <div className="icon" style={{ marginRight: '80px' }}>
            <FontAwesomeIcon icon={faCog} className="iconimg" />
          </div>
        </div>
      </div>
      {showNotificationBox && (
        <div className="notification-box">
          {/* Render notifications */}
          {notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              {notification.message}
            </div>
          ))}
          {/* Add a button to acknowledge notifications */}
          <button onClick={emitNotificationAcknowledgement}>Acknowledge</button>
        </div>
      )}
      {showMessageBox && (
        <div className="message-box">
          {/* Message Box Content */}
        </div>
      )}
      {/* Profile picture upload modal */}
      {showProfileModal && (
        <div className="profile-upload-modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseProfileModal}>&times;</span>
            <h6>Upload Profile Picture</h6>
            <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
            <button onClick={handleSaveProfilePicture}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notificationbar;