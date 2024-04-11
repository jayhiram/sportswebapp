import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Notificationbar from './components/Notificationbar'; // Import Notificationbar
import Sidebar from './components/Sidebar'; 
import UpcomingEvents from './pages/UpcomingEvents';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UserProfile from './components/UserProfile';
import ForumPage from './pages/ForumPage';
import Gallery from './components/Gallery'; // Import the Gallery component
import Logout from './components/Logout';
import UserList from './components/UserList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleSidebarItemClick = (item) => {
    console.log(`Clicked on ${item}`);
  };

  return (
    <Router>
      <div>
        {isLoggedIn ? (
          <>
            {/* Pass onSidebarItemClick as a prop */}
            <Notificationbar onSideItemClick={handleSidebarItemClick} />
            <Sidebar onSidebarItemClick={handleSidebarItemClick} />
          </>
        ) : (
          <Navbar setIsLoggedIn={setIsLoggedIn} />
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/events" element={<UpcomingEvents />} />
          <Route path="/support" element={<Footer />} />
          <Route path="/signup/login" element={<AuthPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/forums" element={<ForumPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/users" element={<UserList />} />
          <Route
            path="/gallery"
            element={isLoggedIn ? <Gallery /> : <Navigate to="/signup/login" />} // Conditional rendering for Gallery component
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
