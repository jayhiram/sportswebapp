import React, { useState } from 'react';
import axios from 'axios';

const CreateEventForm = ({ token }) => {
  const [eventName, setEventName] = useState('');
  // Other form fields...

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/events', { eventName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Create event error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
      {/* Other form fields... */}
      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEventForm;
