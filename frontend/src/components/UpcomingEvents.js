// UpcomingEvents.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.name}</strong> - {event.date} {event.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;


























{/*import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import footballImage from '../components/images/football.jpg';
import volleyballImage from '../components/images/volleyball.jpg';
import hockeyImage from '../components/images/hockey.jpg';
import '../styles/UpcomingEvents.css'

const UpcomingEvents = () => {
    // Define an array of events
    const events = [
        { 
            id: 1, 
            name: 'ACK vs Prison vs Mtaani Football Clash',
            date: new Date('2024-05-20T10:00:00'), 
            sport: 'Football', 
            teams: 'ACK vs Prison vs Mtaani',
            location: 'Uwanja Water',
            image: footballImage 
        },
        { 
            id: 2,
            name: 'Pwani Uni vs KMTC Kilifi Football Showdown',
            date: new Date('2024-05-21T14:00:00'),
            sport: 'Football', 
            teams: 'Pwani Uni vs KMTC Kilifi',
            location: 'KarisMaith field',
            image: volleyballImage 
        },
        { 
            id: 3,
            name: 'Rugby Beach Festival Tournament',
            date: new Date('2024-05-23T09:00:00'), 
            sport: 'Rugby',
            teams: 'Oasis,Kilifi,Malind',
            location: 'Butwani Beach (Malindi)',
            image: hockeyImage
        }
    ];

    return (
        <section className="upcoming-events">
            <h2>Upcoming Events</h2>
            <div className="event-list">
                {events.map(event => (
                    <div key={event.id} className="event-card">
                        <div className="event-details">
                            <div className="event-image-container">
                                <img src={event.image} alt="Event" className="event-image" />
                                <h3 className="event-name">{event.name}</h3>
                            </div>
                            <div className="event-date">
                                <FontAwesomeIcon icon={faCalendarAlt} title="Date" /> {event.date.toLocaleDateString()}
                            </div>
                            <div className="event-time">
                                <FontAwesomeIcon icon={faClock} title="Time" /> {event.date.toLocaleTimeString()}
                            </div>
                            <div className="event-location">
                                <FontAwesomeIcon icon={faMapMarkerAlt} title="Location" /> {event.location}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <a href="/all-events" className="view-all-button">View All Events</a>

        </section>
    );
};

export default UpcomingEvents;*/}
