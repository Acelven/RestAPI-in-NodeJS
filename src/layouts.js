import React from 'react';
import { HashRouter  as Router, Route, Routes } from 'react-router-dom';
import Navbar from './navbar.js';
import Tracking from './tracking.js';
import Login from './login.js'

const Layouts = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar always stays on top */}
      <Routes>
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes for other components/pages */}
      </Routes>
    </Router>
  );
};


export default Layouts;