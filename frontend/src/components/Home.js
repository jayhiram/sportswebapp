import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faTimes,faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import footballImage from '../components/images/football.jpg';
import volleyballImage from '../components/images/volleyball.jpg';
import hockeyImage from '../components/images/hockey.jpg';
import rugbyImage from '../components/images/rugby.jpg';
import football from '../components/images/football.jpg'; // Import football image
import basketball from '../components/images/basketball.jpg'; // Import basketball image
import rugby from '../components/images/rugby.jpg'; 
import upcomingevents from '../components/images/upcomingevents.png';
import forum from '../components/images/forum.jpg';
import gallery from '../components/images/gallery.jpg';

import '../styles/Home.css'

function Home() {
  return (
    <div className='homepage'>

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

        <section className="featured-activities">
            <h2>Featured Sports</h2>
            <div className="activity-list">
                <div className="activity-card">
                    <img src={football} alt="Football Tournament" />
                    <div className="activity-details">
                        <h3>Football Tournament</h3>
                        <p>A thrilling football tournament for all skill levels.</p>
                    </div>
                </div>
                <div className="activity-card">
                    <img src={basketball} alt="Basketball Training Camp" />
                    <div className="activity-details">
                        <h3>Basketball Training Camp</h3>
                        <p>Improve your basketball skills with expert coaching.</p>
                    </div>
                </div>
                <div className="activity-card">
                    <img src={rugby} alt="Rugby Workshop" />
                    <div className="activity-details">
                        <h3>Rugby Workshop</h3>
                        <p>Join us for a fun and informative rugby workshop.</p>
                    </div>
                </div>
            </div>
            {/* Sign up message */}
            <div className="sign-up-message">
                <p><strong>Sign up today and learn more!</strong></p>
            </div>
        </section>

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

        <section className="call-to-action">
            <div className="cta-content">
                <h2>Join Kilifi Sport Hub Today!</h2>
                <p>Experience the excitement of connecting with fellow sports enthusiasts in Kilifi County!
                    By becoming a member of Kilifi Sport Hub, you unlock exclusive benefits:</p>
                <ul className="benefits-list">
                    <li>
                        <img src={upcomingevents} alt="Private Chats" />
                        <div>
                            <h3>Upcoming-Events</h3>
                            <p>Find out about upcoming events!From sports strategies to tips and tricks, 
                                join in to connect with us,Register for upcoming events.</p>
                        </div>
                    </li>
                    <li>
                        <img src={forum} alt="Forums" />
                        <div>
                            <h3>Participate in Forums</h3>
                            <p>Engage in lively discussions, share your thoughts on recent sports events, 
                                and learn from fellow enthusiasts.</p>
                        </div>
                    </li>
                    <li>
                        <img src={gallery} alt="Gallery" />
                        <div>
                            <h3>Explore the Gallery</h3>
                            <p>Discover a treasure trove of photos and videos capturing 
                                the excitement of Kilifi sports events, games, and more.</p>
                        </div>
                    </li>
                </ul>
                <p>Don't miss out on the opportunity to be part of this dynamic sports community.
                 </p>
            
            </div>
        </section>

        <footer className="footer">
            <div className="footer-container">
                
                <div className="footer-section social-media">
                    <h3>Follow Us</h3>
                    <ul>
                        <li><a href="https://www.facebook.com/YourFacebookPage" target="_blank" 
                        rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /> </a></li>

                        <li><a href="https://twitter.com/X" target="_blank"
                         rel="noopener noreferrer"><FontAwesomeIcon icon={faTimes} /> </a></li>

                        <li><a href="https://www.instagram.com/YourInstagramProfile" target="_blank" 
                        rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /> </a></li>

                        <li><a href="https://www.linkedin.com/in/YourLinkedinProfile" target="_blank" 
                        rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /> </a></li>
                    </ul>
                </div>
                <div className="footer-section contact-help">
                    <h3>Contact Help</h3>
                    
                    <p>
                <FontAwesomeIcon icon={faEnvelope} /> 
                <a href="mailto:wjane0664@gmail.com">wjane0664@gmail.com</a>
            </p>
            <p>
                <FontAwesomeIcon icon={faPhone} /> 
                <a href="tel:+254705969893">+254705969893</a>
            </p>
            <p>
            <FontAwesomeIcon icon={faWhatsapp} /> 
            <a href="https://wa.me/+254774859988">+254774859948</a>
        </p>
                </div>
            </div>
        </footer>
      
        <footer className="footer">
            <div className="footer-container">
                <div className="copyright">
                    <p>&copy; 2023 Kilifi Sports Hub. All rights reserved.</p>
                </div>
            </div>
        </footer>

    </div>
  )
}

export default Home
