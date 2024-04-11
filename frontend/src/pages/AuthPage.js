import React, { useState } from 'react';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import ForgotPassword from '../components/ForgotPassword';
import NewPassword from '../components/NewPassword';
//import UserProfile from '../components/UserProfile';

const AuthPage = ({ setIsLoggedIn }) => {
  const [step, setStep] = useState('signup');

  const navigateToSignup = () => {
    setStep('signup');
  };

  const navigateToLogin = () => {
    setStep('login');
  };

  const navigateToForgotPassword = () => {
    setStep('forgotPassword');
  };

  const navigateToNewPassword = () => {
    setStep('newPassword');
  };

  const navigateToUserProfile = () => {
    setIsLoggedIn(true); // Update isLoggedIn state after successful login
    setStep('userProfile');
  };

  return (
    <div>
      {step === 'signup' && <SignUp setIsLogin={navigateToLogin} />}
      {step === 'login' && <Login setIsLoggedIn={navigateToUserProfile} navigateToSignup={navigateToSignup} navigateToForgotPassword={navigateToForgotPassword} navigateToUserProfile={navigateToUserProfile} />}
      {step === 'forgotPassword' && <ForgotPassword navigateToNewPassword={navigateToNewPassword} />}
      {step === 'newPassword' && <NewPassword />}
      {/*{step === 'userProfile' && <UserProfile />}*/}
    </div>
  );
};

export default AuthPage;
