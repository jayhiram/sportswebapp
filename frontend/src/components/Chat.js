import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3001'; // Update with your server URL

const users = [
  { id: 'jane', name: 'Jane' },
  { id: 'kush', name: 'Kush' },
  { id: 'winnie', name: 'Winnie' },
  { id: 'james', name: 'James' },
  // Add more users as needed
];

const App = () => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);

    newSocket.on('receive-message', ({ senderId, message }) => {
      console.log('Message received:', senderId, message);
      setMessages(prevMessages => [...prevMessages, { senderId, message }]);
      setNotificationCount(prevCount => prevCount + 1);
    });

    newSocket.on('notification', () => {
      setNotificationCount(prevCount => prevCount + 1);
    });

    return () => newSocket.disconnect();
  }, []);

  const handleLogin = (id, name) => {
    setUserId(id);
    setUsername(name);
    setMessages([]); // Clear messages when logging in
    setNotificationCount(0); // Reset notification count when logging in
    setMessages([]); // Reset messages when logging in
    setSelectedUser(null); // Reset selected user when logging in
    socket.emit('login', id);
  };

  const handleMessageInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const sendMessage = () => {
    if (socket && selectedUser && messageInput.trim() !== '') {
      socket.emit('send-message', { senderId: userId, recipientId: selectedUser.id, message: messageInput });
      setMessages(prevMessages => [...prevMessages, { senderId: userId, message: messageInput }]);
      setMessageInput('');
    }
  };

  const selectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <h1>Welcome, {username || 'Guest'}!</h1>
      {!userId && (
        <div>
          {users.map(user => (
            <button key={user.id} onClick={() => handleLogin(user.id, user.name)}>Login as {user.name}</button>
          ))}
        </div>
      )}
      {userId && (
        <div>
          <div>
            {selectedUser && <h2>Chatting with: {selectedUser.name}</h2>}
            {messages.map((msg, index) => (
              <div key={index}>
                {msg.senderId === userId ? 'You: ' : `${selectedUser.name}: `}
                {msg.message}
              </div>
            ))}
          </div>
          <div>
            {users.map(user => (
              <button key={user.id} onClick={() => selectUser(user)} disabled={user.id === userId}>
                {user.name}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={messageInput}
            onChange={handleMessageInputChange}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
      <div>
        Notifications: {notificationCount}
      </div>
    </div>
  );
};

export default App;
