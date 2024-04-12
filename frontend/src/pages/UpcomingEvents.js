import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateEvent from './CreateEvent';
import Events from './Events';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

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
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return (
    <div>
      {user && user.role === 'admin' && <CreateEvent setEvents={setEvents} />}
      <Events events={events} />
    </div>
  );
};

export default UpcomingEvents;