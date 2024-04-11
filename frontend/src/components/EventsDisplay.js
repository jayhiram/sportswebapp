import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const EventsDisplay = ({ events }) => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationVisible, setRegistrationVisible] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    phoneNumber: '',
  });
  const [filters, setFilters] = useState({
    sport: '',
    date: '',
    location: ''
  });

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  useEffect(() => {
    applyFilters();
  }, [filters, events]);

  const handleRegistrationToggle = (eventId) => {
    setRegistrationVisible({ ...registrationVisible, [eventId]: !registrationVisible[eventId] });
  };

  const handleRegistrationSubmit = (eventId, formData) => {
    // Handle registration submission logic, e.g., send data to backend
    console.log(`Event ID: ${eventId}, Registration Data:`, formData);
    // Reset registration form visibility after submission
    setRegistrationVisible({ ...registrationVisible, [eventId]: false });
    // Show registration success message
    setRegistrationSuccess(true);
    // Reset success message after 3 seconds
    setTimeout(() => {
      setRegistrationSuccess(false);
    }, 3000);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = events;
    if (filters.sport) {
      filtered = filtered.filter(event => event.sport.toLowerCase().includes(filters.sport.toLowerCase()));
    }
    if (filters.date) {
      filtered = filtered.filter(event => event.date === filters.date);
    }
    if (filters.location) {
      filtered = filtered.filter(event => event.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    setFilteredEvents(filtered);
  };

  const openGoogleMaps = (location) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="events-container">
      <h2>Upcoming Events</h2>
      <div className="filters">
        <select value={filters.sport} onChange={handleFilterChange} name="sport">
          <option value="">All Sports</option>
          <option value="Football">Football</option>
          <option value="Basketball">Basketball</option>
          <option value="Tennis">Tennis</option>
          <option value="Swimming">Swimming</option>
          <option value="Running">Running</option>
        </select>
        <input type="date" name="date" value={filters.date} onChange={handleFilterChange} />
        <input type="text" name="location" placeholder="Filter by Location" value={filters.location} onChange={handleFilterChange} />
      </div>
      <div className="events-grid">
        {filteredEvents.map(event => (
          <div key={event.id} className="event-card">
            <h3>{event.name}</h3>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} onClick={() => openGoogleMaps(event.location)} />
              : {event.location}
            </p>
            <button onClick={() => handleRegistrationToggle(event.id)}>Register</button>
            {registrationVisible[event.id] && (
              <form className="registration-form" onSubmit={(e) => handleRegistrationSubmit(event.id, e)}>
                <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleInputChange} required />
                <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} required />
                {errors.email && <span className="error">{errors.email}</span>}
                <input type="tel" placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
                {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                <button type="submit">Submit</button>
              </form>
            )}
            {registrationSuccess && <div
className="success-message">Registered successfully!</div>}
</div>
))}
</div>
</div>
);
};

export default EventsDisplay;
