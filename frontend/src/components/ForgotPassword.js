import React, { useState } from 'react';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmitEmail = () => {
    // Perform form validation
    if (!email.trim()) {
      setErrorMessage('Email field cannot be empty!');
      return;
    }
    if (!email.includes('@')) {
      setErrorMessage('Invalid email format');
      return;
    }

    // Perform logic to check if email exists in the database
    // For demo purpose, assume the email doesn't exist
    console.log('Checking if email exists...');

    // Simulating email not found scenario
    setErrorMessage('Email not found');
    setIsEmailSubmitted(true); // You can remove this line in your actual implementation
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password?</h2>
      <p>Reset your password in three easy steps. This will help you to secure your account.</p>
      <ol>
        <li>Enter your email address below</li>
        <li>Our system will send you a temporary link</li>
        <li>Use the link to reset your password</li>
      </ol>
      {!isEmailSubmitted ? (
        <div>
          <label htmlFor="email">Enter your email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSubmitEmail}>Get New Password</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      ) : (
        <p>Great! Go to your email and click the link sent.</p>
      )}
    </div>
  );
};

export default ForgotPassword;
