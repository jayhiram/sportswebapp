import React from 'react';
import '../styles/FeaturedSports.css'; 
import football from '../components/images/football.jpg'; // Import football image
import basketball from '../components/images/basketball.jpg'; // Import basketball image
import rugby from '../components/images/rugby.jpg'; 

const FeaturedSports = () => {

    return (
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
    );
};

export default FeaturedSports;
