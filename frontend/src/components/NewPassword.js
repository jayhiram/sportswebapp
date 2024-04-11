// NewPassword.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to retrieve token from URL params
import '../styles/NewPassword.css';

const NewPassword = () => {
  const { token } = useParams(); // Retrieve token from URL params
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmitPassword = () => {
    // Perform form validation
    if (!email.includes('@')) {
      setErrorMessage('Invalid email format');
      return;
    }
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Perform logic to update user's password using the provided token and email
    console.log('Updating password...');
    console.log('Email:', email);
    console.log('Token:', token);
    console.log('New Password:', password);
    // Here, you would send a request to your server to update the user's password using the provided token and email

    // Optionally, you can redirect the user to the login page after successful password reset
    // history.push('/login');
  };

  return (
    <div className="new-password-container">
      <h2>Set New Password</h2>
      <p>Enter your email and new password below.</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSubmitPassword}>Set Password</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default NewPassword;
