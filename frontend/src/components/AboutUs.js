import React from 'react';
import footballImage from '../components/images/football.jpg';
import volleyballImage from '../components/images/volleyball.jpg';
import hockeyImage from '../components/images/hockey.jpg';
import rugbyImage from '../components/images/rugby.jpg';
import '../styles/AboutUs.css';

const AboutUs = () => {
    return (
        <section className="about-us">
            <div className="about-content">
                <h2>About Kilifi Sport Hub</h2>
            <p>Step into Kilifi Sports Hub, where sports in Kilifi County come
                     to life! We're all about bringing people together through sports, 
                     making it easy for you to connect and enjoy your favorite games.</p>
  <p>At Kilifi Sports Hub, we're more than just a hub – we're a friendly community of
     sports lovers. Whether you're into football, basketball, tennis, or swimming, 
     there's something here for everyone. Join us for the latest events, chat with 
     fellow fans, and dive into the action!</p>
  <p>Come on board today and experience the fun and excitement of Kilifi Sports Hub.
     Let's play together and celebrate every win as a team!</p>
                <h3>Vision</h3>
                <p>Our vision is to create a dynamic and inclusive sports community
                     in Kilifi County, where individuals of all ages and backgrounds
                      can participate, excel, and find joy in sports.</p>
                
                <h3>Mission</h3>
                <p>At Kilifi Sport Hub, our mission is to:</p>
                <ul>
                    <li>Facilitate easy access to sports events and activities</li>
                    <li>Promote inclusivity and diversity in sports</li>
                    <li>Provide resources and support for aspiring athletes</li>
                    <li>Empower local sports organizations and clubs</li>
                    <li>Celebrate the achievements and successes of Kilifi's sports community</li>
                </ul>
                
                <h3>Location</h3>
                <p>Kilifi Sport Hub is conveniently located at:</p>
                <p>123 Sports Avenue, Kilifi Town, Kilifi County</p>
                <p>We also have offices in Kilifi Town and Malindi Town:</p>
                <ul>
                    <li>Kilifi Town Office: 456 Main Street, Kilifi Town</li>
                    <li>Malindi Town Office: 789 Coastal Road, Malindi Town</li>
                </ul>

                <p>Our dedicated team of sports enthusiasts is committed to making Kilifi County a vibrant hub for sports and athletics. Join us in our journey to inspire, empower, and unite through the power of sports!</p>

                {/* Additional Information with Zoomable Images and Enhanced Captions */}
                <div className="additional-info">
                    <div className="image-container">
                        <img src={footballImage} alt="Football" className="zoomable-image" />
                        <div className="caption">
                            <h4>Football</h4>
                            <p>Team sport promoting teamwork, discipline, and fitness.</p>
                        </div>
                    </div>
                    <div className="image-container">
                        <img src={volleyballImage} alt="Volleyball" className="zoomable-image" />
                        <div className="caption">
                            <h4>Volleyball</h4>
                            <p>Inclusive sport fostering coordination and communication.</p>
                        </div>
                    </div>
                    <div className="image-container">
                        <img src={hockeyImage} alt="Hockey" className="zoomable-image" />
                        <div className="caption">
                            <h4>Hockey</h4>
                            <p>Exhilarating sport requiring agility, strategy, and teamwork.</p>
                        </div>
                    </div>
                    <div className="image-container">
                        <img src={rugbyImage} alt="Rugby" className="zoomable-image" />
                        <div className="caption">
                            <h4>Rugby</h4>
                            <p>High-impact sport emphasizing strength, resilience, and camaraderie.</p>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </section>
    );
};

export default AboutUs;
