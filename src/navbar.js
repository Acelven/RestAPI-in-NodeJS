import React from 'react';
// import logo from './icons/logo.png';
import './styles.css';
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
        <a href="/">
            <h2>Logo</h2>
          </a>
        </div>
        <ul className="navbar-menu">
          <li><a href="/login">Log in</a></li>
          <li><a href="/tracking">Tracking</a></li>
          {/* Add more navigation items as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;