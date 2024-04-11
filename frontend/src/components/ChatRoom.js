import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faComments, faUsers } from '@fortawesome/free-solid-svg-icons';
import '../styles/ChatRoom.css';

const ChatRoom = ({ username, room }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const messageThreadRef = useRef(null);

    useEffect(() => {
        const newSocket = io();
        setSocket(newSocket);

        newSocket.emit('joinRoom', { username, room });

        // Fetch previous messages when component mounts
        fetchPreviousMessages(room);

        return () => {
            newSocket.disconnect();
        };
    }, [username, room]);

    useEffect(() => {
        if (!socket) return;

        socket.on('message', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        socket.on('userAction', (actionMessage) => {
            setMessages(prevMessages => [...prevMessages, actionMessage]);
        });

        socket.on('roomUsers', ({ users }) => {
            setUsers(users);
        });

    }, [socket]);

    const sendMessage = () => {
        if (messageInput.trim() !== '') {
            const newMessage = {
                username: username,
                text: messageInput,
                time: new Date().toLocaleTimeString()
            };
            socket.emit('chatMessage', { ...newMessage, room });
            setMessageInput('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage();
    };

    const leaveChatRoom = () => {
        const leaveRoom = window.confirm('Are you sure you want to leave the chatroom?');
        if (leaveRoom) {
            window.location = '../index.html';
        }
    };

    const fetchPreviousMessages = async (room) => {
        try {
            const response = await fetch(`/api/messages/${room}`);
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching previous messages:', error);
        }
    };

    useEffect(() => {
        if (messageThreadRef.current) {
            messageThreadRef.current.scrollTop = messageThreadRef.current.scrollHeight;
        }
    }, [messages]);


    return (
        <div className="chatroom-container">
            <div className="chatroom">
                <header className="chatroom-header">
                    <h1 className="title"><FontAwesomeIcon icon={faComments} /> ChatRoom</h1>
                    <button onClick={leaveChatRoom} className="leave-btn">Leave Room</button>
                </header>
                <div className="chatroom-main">
                    <div className="chatroom-sidebar">
                        <div className="sidebar-header">
                            <FontAwesomeIcon className="icon" icon={faComments} />
                            <h3>Room Name:</h3>
                        </div>
                        <h2>{room}</h2>
                        <div className="sidebar-header">
                            <h3>User:</h3>
                        </div>
                        <p>{username}</p>
                        <div className="sidebar-header">
                            <FontAwesomeIcon className="icon" icon={faUsers} />
                            <h3>Users</h3>
                        </div>
                        <ul className="room-users">
                            {users.map((user, index) => (
                                <li key={index}>{user}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="message-thread" ref={messageThreadRef}>
                        <div className="chatroom-messages">
                            {messages.map((message, index) => (
                                <div key={index} className={`message ${message.username === username ? 'outgoing' : 'incoming'}`}>
                                    <div className="meta">
                                    <p className="username">
                            {message.username === username ? 
                                <span className="you">{message.username} (You)</span> : 
                                <span>{message.username}</span>
                            }
                        </p>
                                    </div>
                                    <p className="text">{message.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="chatroom-form-container">
                    <form id="chat-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="Type your message..."
                            name='msg'
                        />
                        <FontAwesomeIcon icon={faPaperPlane} onClick={sendMessage} />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;