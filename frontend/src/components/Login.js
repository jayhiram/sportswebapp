import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', { email, password });

      if (response.status === 200) {
        const { role } = response.data;
        // Store role in local storage or state
        localStorage.setItem('userRole', role);
        setIsLoggedIn(true);
        navigate('/gallery');
      } else {
        setError('Incorrect email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p className="error-message">{error}</p>}
      <p>Forgot password? <span onClick={() => navigate('/forgot-password')}>Click here to reset</span></p>
      <p>Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span></p>
    </div>
  );
};

export default Login;