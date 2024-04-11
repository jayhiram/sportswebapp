// Footer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faTimes,faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import '../styles/Footer.css';

const Footer = () => {
    return (
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
    );
};

export default Footer;
