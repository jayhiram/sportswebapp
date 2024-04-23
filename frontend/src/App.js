// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Notificationbar from './components/Notificationbar';
import Sidebar from './components/Sidebar'; 
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UserProfile from './components/UserProfile';
import ForumPage from './pages/ForumPage';
import Gallery from './components/Gallery'; 
import Logout from './components/Logout';
import Events from './components/Events';
import FeaturedSports from './components/FeaturedSports';
import Support from './components/Footer';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleSidebarItemClick = (item) => {
    console.log(`Clicked on ${item}`);
  };

  return (
    <Router>
      <div>
        <Notificationbar />
        {isLoggedIn ? (
          <Sidebar onSidebarItemClick={handleSidebarItemClick} />
        ) : (
          <Navbar setIsLoggedIn={setIsLoggedIn} />
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/sports" element={<FeaturedSports />} />
          
          <Route path="/support" element={<Footer />} />
          <Route path="/signup/login" element={<AuthPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/forums" element={<ForumPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/support" element={<Support />} />
          <Route path="/gallery" element={isLoggedIn ? <Gallery /> : <Navigate to="/signup/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
