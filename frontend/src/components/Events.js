import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateEvent from '../components/CreateEvent';
import Events from '../components/Events';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    fetchUserRole();
    fetchEvents();
  }, []);

  const fetchUserRole = async () => {
    try {
      const response = await axios.get('/api/user/role');
      setUserRole(response.data.role);
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div>
      {userRole === 'admin' && <CreateEvent setEvents={setEvents} />}
      <Events events={events} />
    </div>
  );
};

export default UpcomingEvents;