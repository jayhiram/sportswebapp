import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom without wrapping Router
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css';

function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);

    const closeMenu = () => {
        setOpenMenu(false);
    };

    return (
        <nav className="navbar">
            <div className='logo-container'>
                <h3 className='logo'>
                    KILIFI<span className='middle'>SPORTS</span>HUB!
                </h3>
            </div>
            <ul className={`menu ${openMenu ? 'open' : ''}`}>
                <li>
                    <Link to="/" onClick={closeMenu}><FontAwesomeIcon icon={faHome} /></Link>
                </li>
                <li>
                    <Link to="/about" onClick={closeMenu}>About</Link>
                </li>
                
                <li>
                    <Link to="/sports" onClick={closeMenu}>Sports</Link>
                </li>
                <li>
                    <Link to="/support" onClick={closeMenu}>Support</Link>
                </li>
            </ul>
           
            <Link to="/signup/login"><button className='signin-btn'>Signup/Login</button></Link>

        </nav>
    );
}

export default Navbar;
