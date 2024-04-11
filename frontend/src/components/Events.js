import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Events.css'

const Events = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    phoneNumber: '',
  });

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

  const openGoogleMaps = (location) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegistrationSubmit = async (eventId) => {
    // Validate form fields before submitting
    if (!validateForm()) {
      return;
    }

    try {
      // Send registration data to backend
      await axios.post(`/api/events/${eventId}/register`, formData);
      // Reset form data after successful registration
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
      });
      // Fetch events again to reflect updated registrations
      fetchEvents();
    } catch (error) {
      console.error('Error submitting registration:', error);
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};
    // Validate email
    if (!formData.email.includes('@')) {
      newErrors.email = 'Email must contain @';
      valid = false;
    }
    // Validate phone number
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  return (
    <div className="events-container">
      <h2>Upcoming Events</h2>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.name}</h3>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} onClick={() => openGoogleMaps(event.location)} />
              : {event.location}
            </p>
            <form className="registration-form" onSubmit={(e) => { e.preventDefault(); handleRegistrationSubmit(event.id); }}>
              <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleInputChange} required />
              <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} required />
              {errors.email && <span className="error">{errors.email}</span>}
              <input type="tel" placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
              {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
              <button type="submit">Register</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
