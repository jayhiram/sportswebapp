// ChatForm.js
import React, { useState } from 'react';
import '../styles/ChatForm.css';

const ChatForm = ({ setUsername, setRoom, joinChat }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const rooms = ['Soccer', 'Basketball', 'Tennis', 'Golf', 'Cricket'];

  const handleJoinClick = () => {
    setUsername(usernameInput);
    setRoom(selectedRoom);
    joinChat();
  };

  return (
    <div className="chat-form-card">
      <h2 className="chat-form-title">Join a chat room</h2>
      <form className="chat-form-form">
        <label className="chat-form-label" htmlFor="username">
          Username
        </label>
        <input
          className="chat-form-input"
          type="text"
          id="username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <label className="chat-form-label" htmlFor="room">
          Room
        </label>
        <select
          className="chat-form-input"
          id="room"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          <option value="">Select a room</option>
          {rooms.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
        <button
          className="chat-form-button"
          onClick={handleJoinClick}
          disabled={!usernameInput || !selectedRoom}
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
