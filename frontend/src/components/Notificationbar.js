import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import '../styles/Notificationbar.css';

const Notificationbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotificationBox, setShowNotificationBox] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    const socket = io('http://localhost:3009', { transports: ['websocket'] });

    socket.on('connect', () => {
      console.log('WebSocket connection established');
    });

    socket.on('newRegistration', (notification) => {
      // Check if the notification is for the current user
      
        setNotifications((prevNotifications) => [...prevNotifications, notification]);
        setUnreadNotifications((prevUnreadNotifications) => prevUnreadNotifications + 1);
      
    });
  
    socket.on('newEventCreated', (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
      setUnreadNotifications((prevUnreadNotifications) => prevUnreadNotifications + 1);
    });
  


    const fetchUnreadNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications');
        setNotifications(response.data);
        setUnreadNotifications(response.data.filter((n) => !n.is_read).length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchUnreadNotifications();

    return () => {
      socket.disconnect();
    };
  }, []);

  // Inside handleNewNotification function
const handleNewNotification = async (notification) => {
  try {
     // Format timestamp to MySQL datetime format
     const timestamp = new Date(notification.timestamp).toISOString().slice(0, 19).replace('T', ' ');
    // Save the notification in the database
    await axios.post('/api/notifications', notification);
    setNotifications((prevNotifications) => [...prevNotifications, notification]);
    setUnreadNotifications((prevUnreadNotifications) => prevUnreadNotifications + 1);
  } catch (error) {
    console.error('Error saving notification:', error);
  }
};


  const toggleNotificationBox = async () => {
    setShowNotificationBox(!showNotificationBox);
    if (!showNotificationBox) {
      await markNotificationsAsRead();
      setUnreadNotifications(0);
    }
  };

  const markNotificationsAsRead = async () => {
    try {
      // Mark notifications as read in the database
      await axios.put('/api/notifications/read');
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) => ({ ...n, is_read: true }))
      );
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };


  return (
    <div className="navbar">
      <div className="icons">
        <div className="icon" style={{ marginRight: '10px' }} onClick={toggleNotificationBox}>
          <FontAwesomeIcon icon={faBell} className="iconimg" />
          {unreadNotifications > 0 && (
            <div className="counter">{unreadNotifications}</div>
          )}
        </div>
      </div>

      {showNotificationBox && (
        <div className="notification-box">
          {notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              <div className="notification-header">
                <span className="notification-sender">Server</span>
                <span className="notification-title">Registration of Event</span>
              </div>
              <p>{notification.message}</p>
              <span className="notification-timestamp">{notification.timestamp}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notificationbar;



