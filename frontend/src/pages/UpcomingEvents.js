
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateEvent from '../components/CreateEvent';
import Events from '../components/Events';



const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

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
      
      <CreateEvent setEvents={setEvents} />
      <Events events={events} />
      
    </div>
   
  );
};

export default UpcomingEvents