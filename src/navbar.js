import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <h2>Logo</h2>
          </Link>
        </div>
        <ul className="navbar-menu">
          <li><Link to="/login">Log in</Link></li>
          <li><Link to="/tracking">Tracking</Link></li>
          {/* Add more navigation items as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
