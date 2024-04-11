// ForumPage.js
import React, { useState } from 'react';
import ChatRoom from '../components/ChatRoom';
import ChatForm from '../components/ChatForm';

const ForumPage = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [chatStarted, setChatStarted] = useState(false);

  const joinChat = () => {
    setChatStarted(true);
  };

  return (
    <div>
      {chatStarted ? (
        <ChatRoom username={username} room={room} />
      ) : (
        <ChatForm setUsername={setUsername} setRoom={setRoom} joinChat={joinChat} />
      )}
    </div>
  );
};

export default ForumPage;
