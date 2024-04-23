import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faComments, faCalendarAlt, faImages,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Sidebar.css';

const Sidebar = ({ onSidebarItemClick }) => {
  return (
    <div className="sidebar">
      <ul>
      

      
        <li onClick={() => onSidebarItemClick('users')}>
          <Link to="/support">
            <FontAwesomeIcon icon={faQuestionCircle} />
            <span className="icon-text">Support</span>
          </Link>
        </li>
        <li onClick={() => onSidebarItemClick('forums')}>
          <Link to="/forums">
            <FontAwesomeIcon icon={faComments} />
            <span className="icon-text">Forums</span>
          </Link>
        </li>
        <li onClick={() => onSidebarItemClick('events')}>
          <Link to="/events">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span className="icon-text">Events</span>
          </Link>
        </li>
        <li onClick={() => onSidebarItemClick('gallery')}>
          <Link to="/gallery">
            <FontAwesomeIcon icon={faImages} />
            <span className="icon-text">Gallery</span>
          </Link>
        </li>
        <li className="logout">
          <Link to="/logout">
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="icon-text">Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
