import React from 'react';

import privatechats from '../components/images/privatechats.jpg';
import forum from '../components/images/forum.jpg';
import gallery from '../components/images/gallery.jpg';
import '../styles/CallToAction.css'

const CallToAction = () => {
    return (
        <section className="call-to-action">
            <div className="cta-content">
                <h2>Join Kilifi Sport Hub Today!</h2>
                <p>Experience the excitement of connecting with fellow sports enthusiasts in Kilifi County!
                    By becoming a member of Kilifi Sport Hub, you unlock exclusive benefits:</p>
                <ul className="benefits-list">
                    <li>
                        <img src={privatechats} alt="Private Chats" />
                        <div>
                            <h3>Private Chats</h3>
                            <p>Connect with other members privately, discuss sports strategies, 
                                share tips, and build friendships.</p>
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
    );
};

export default CallToAction;
