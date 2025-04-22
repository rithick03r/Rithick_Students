import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{ marginTop: '60px' }}>
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Student Management System
        </NavLink>
        
      </div>
    </nav>
  );
}

export default Navbar;
