import React, { useState } from 'react';
import '../styles/CreateEvent.css';
import axios from 'axios';

const CreateEvent = ({ setEvents }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    sport: '',
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/events', formData);
      setEvents((prevEvents) => [...prevEvents, response.data]);
      setFormData({
        name: '',
        date: '',
        time: '',
        location: '',
        sport: '',
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='create-event-container'>
      <h2>Create Event</h2>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Event Name" name="name" value={formData.name} onChange={handleInputChange} required />
        <input type="date" placeholder="Date" name="date" value={formData.date} onChange={handleInputChange} required />
        <input type="time" placeholder="Time" name="time" value={formData.time} onChange={handleInputChange} required />
        <input type="text" placeholder="Location" name="location" value={formData.location} onChange={handleInputChange} required />
        <input type="text" placeholder="Sport" name="sport" value={formData.sport} onChange={handleInputChange} required />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
