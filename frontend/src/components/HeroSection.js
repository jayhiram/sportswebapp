import React from 'react';
import { Link } from 'react-router-dom';
import footballImage from '../components/images/football.jpg';
import volleyballImage from '../components/images/volleyball.jpg';
import hockeyImage from '../components/images/hockey.jpg';
import rugbyImage from '../components/images/rugby.jpg';
import '../styles/HeroSection.css';

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1><span className="animate-line">Kilifi Sports Community</span></h1>
                <p><span className="animate-line">Join us in celebrating the spirit of sports in Kilifi County.
                We believe in the power of sports to connect and inspire.</span></p>
                <h2><span className="animate-line">Stay updated by joining us today!</span></h2>
            </div>
            <div className="hero-images">
                <div className="image-container">
                    <Link to="/football">
                        <img src={footballImage} alt="Football" />
                        <div className="overlay">Football</div>
                    </Link>
                </div>
                <div className="image-container">
                    <Link to="/volleyball">
                        <img src={volleyballImage} alt="Volleyball" />
                        <div className="overlay">Volleyball</div>
                    </Link>
                </div>
                <div className="image-container">
                    <Link to="/hockey">
                        <img src={hockeyImage} alt="Hockey" />
                        <div className="overlay">Hockey</div>
                    </Link>
                </div>
                <div className="image-container">
                    <Link to="/rugby">
                        <img src={rugbyImage} alt="Rugby" />
                        <div className="overlay">Rugby</div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
