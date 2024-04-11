import React from 'react';
import HeroSection from '../components/HeroSection';
import UpcomingEvents from '../components/UpcomingEvents';
import FeaturedSports from '../components/FeaturedSports';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import AboutUs from '../components/AboutUs';

function HomePage() {
  return (
    <div>
      
      <HeroSection />
      <UpcomingEvents />
      <FeaturedSports />
      <AboutUs />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default HomePage;
