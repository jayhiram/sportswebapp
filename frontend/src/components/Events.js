import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Events.css';

const Events = () => {
  const [userRole, setUserRole] = useState('');
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [registrationEventId, setRegistrationEventId] = useState(null); // New state variable
  const [registrationMessage, setRegistrationMessage] = useState('');

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchData();

    const role = localStorage.getItem('userRole');
    setUserRole(role || '');
  }, []);

  const openGoogleMaps = (location) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`,
      '_blank'
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateEventFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/events', formData);
      setEvents([...events, response.data]);
      setFormData({ name: '', email: '', phoneNumber: '' });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleRegisterEvent = (eventId) => {
    setRegistrationEventId(eventId); // Set the registrationEventId to the clicked event's ID
  };



  const handleRegistrationSubmit = async (eventId) => {
    let valid = true;
    const errors = {};

    if (!formData.email.includes('@')) {
      errors.email = 'Invalid email address';
      valid = false;
    }

    if (formData.phoneNumber.length !== 10) {
      errors.phoneNumber = 'Phone number must be 10 digits';
      valid = false;
    }

    setErrors(errors);

    if (!valid) {
      return;
    }

    try {
      await axios.post(`/api/events/${eventId}/register`, formData);
      setFormData({ name: '', email: '', phoneNumber: '' });
      setRegistrationMessage('Registered successfully for ' + events.find(event => event.id === eventId).name);
      setRegistrationEventId(null); // Reset registrationEventId after successful registration
      setTimeout(() => setRegistrationMessage(''), 5000);
      fetchEvents();
    } catch (error) {
      console.error('Error submitting registration:', error);
    }
  };



  return (
    <div className="events-container">
      {userRole === 'admin' && (
        <div className="create-event-container">
          <h2>Create Event</h2>
          <form onSubmit={handleCreateEventFormSubmit}>
            <input
              type="text"
              placeholder="Event Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              placeholder="Date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
            <input
              type="time"
              placeholder="Time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              placeholder="Sport"
              name="sport"
              value={formData.sport}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Create Event</button>
          </form>
        </div>
      )}

      <h2>Upcoming Events</h2>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.name}</h3>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                onClick={() => openGoogleMaps(event.location)}
              />{' '}
              : {event.location}
            </p>
            {registrationEventId === event.id && ( // Display registration form only for the selected event
              <form
                className="registration-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRegistrationSubmit(event.id);
                }}
              >
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {errors.email && <span className="error">{errors.email}</span>}
                <input
                  type="tel"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
                {errors.phoneNumber && (
                  <span className="error">{errors.phoneNumber}</span>
                )}
                <button type="submit">Register</button>
              </form>
            )}
            {registrationMessage.includes(event.name) && <div>{registrationMessage}</div>}
            {!registrationEventId && ( // Display "Register" button only if registrationEventId is not set
              <button onClick={() => handleRegisterEvent(event.id)}>Register</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
