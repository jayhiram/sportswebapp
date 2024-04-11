import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheck from '@fortawesome/free-solid-svg-icons/faCheck';

const Notification = ({ notification }) => {
  const { message, eventName, eventDate } = notification;
  return (
    <li className="notification">
      <FontAwesomeIcon icon={faCheck} className="icon" />
      <div className="notification-content">
        <p>{message}</p>
        <p>
          <strong>{eventName}</strong>
          <br />
          {eventDate}
        </p>
      </div>
    </li>
  );
};

export default Notification;