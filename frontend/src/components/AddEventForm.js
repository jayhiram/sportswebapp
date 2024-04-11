import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    sport: '',
    description: ''
  });

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events after component mounts
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/events', formData);
      console.log('Event added:', response.data);
      // Clear form fields after successful submission
      setFormData({
        name: '',
        date: '',
        time: '',
        location: '',
        sport: '',
        description: ''
      });
      // Fetch updated events list after adding event
      fetchEvents();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`/api/events/${eventId}`);
      console.log('Event deleted');
      // Fetch updated events list after deleting event
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleUpdate = async (eventId) => {
    // Handle update logic, for instance, you can navigate to a different page for updating
    console.log(`Update event with ID: ${eventId}`);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="name" placeholder="Event Name" value={formData.name} onChange={handleInputChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
        <input type="time" name="time" placeholder="Event Time" value={formData.time} onChange={handleInputChange} required />
        <input type="text" name="location" placeholder="Event Location" value={formData.location} onChange={handleInputChange} required />
        <input type="text" name="sport" placeholder="Event Sport" value={formData.sport} onChange={handleInputChange} required />
        <textarea name="description" placeholder="Event Description" value={formData.description} onChange={handleInputChange}></textarea>
        <button type="submit">Create Event</button>
      </form>
      <div>
        <h2>Events</h2>
        <ul>
          {events.map((event, index) => (
            <li key={index} onClick={() => handleEventClick(event)}>
              <strong>{event.name}</strong> - {event.date} - {event.time} - {event.location} - {event.sport}
              <button onClick={() => handleUpdate(event.id)}>Update</button>
              <button onClick={() => handleDelete(event.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedEvent && (
        <div>
          <h2>Selected Event</h2>
          <p>Name: {selectedEvent.name}</p>
          <p>Date: {selectedEvent.date}</p>
          <p>Time: {selectedEvent.time}</p>
          <p>Location: {selectedEvent.location}</p>
          <p>Sport: {selectedEvent.sport}</p>
          <p>Description: {selectedEvent.description}</p>
        </div>
      )}
    </div>
  );
};

export default AddEventForm;
