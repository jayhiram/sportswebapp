import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateEvent from './CreateEvent';
import Events from './Events';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [userRole, setUserRole] = useState(null); // State to hold user role

  useEffect(() => {
    fetchEvents();
    fetchUser();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/user');
      setUserRole(response.data.role); // Set user role
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return (
    <div>
      {userRole === 'admin' && <CreateEvent setEvents={setEvents} />} {/* Render CreateEvent only for admin users */}
      <Events events={events} />
    </div>
  );
};

export default UpcomingEvents;
