import React from 'react';
import HeroSection from '../components/HeroSection';

import FeaturedSports from '../components/FeaturedSports';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import AboutUs from '../components/AboutUs';

function HomePage() {
  return (
    <div>
      
      <HeroSection />
      
      <FeaturedSports />
      <AboutUs />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default HomePage;
