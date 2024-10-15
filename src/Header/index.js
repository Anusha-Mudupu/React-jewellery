/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './index.css';
import {  useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import topImage from '../Assests/Images/Logo 1.png'

const MyNavbar = ({ cartItemCount }) => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Define navigate using useNavigate hook
  console.log("cartItemCount", cartItemCount)
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      setIsLoggedIn(!!token); // Update the logged-in state
    };
  
    checkLoginStatus(); // Run once on component mount
  
    // Listen for changes in localStorage (e.g., login/logout)
    window.addEventListener('storage', checkLoginStatus);
  
    return () => {
      window.removeEventListener('storage', checkLoginStatus); // Clean up the listener on unmount
    };
  }, []);
  const handleLogout = () => {
    // Clear the token and log the user out
    // localStorage.removeItem('token');
    // setIsLoggedIn(false);
    alert('You have logged out.');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="mb-4">
      <Navbar fixed="top" className="bg navbar" expand="lg">
        <Container>
          <Navbar.Brand className="MyWebsite">
            <img src={topImage} width="300px" alt="Website Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto custom-nav">
              <Nav.Link as={Link}  to="/"  style={{ color: location.pathname === '/' ? '#d1a338' : 'white' }}>Home</Nav.Link>
              <Nav.Link as={Link} to="/Footer" style={{ color: location.pathname === '/Footer' ? '#d1a338' : 'white' }}>About Us</Nav.Link>
              <Nav.Link as={Link} to="/services" style={{ color: location.pathname === '/services' ? '#d1a338' : 'white' }}>services</Nav.Link>
              <Nav.Link as={Link} to="/contact" style={{ color: location.pathname === '/contact' ? '#d1a338' : 'white' }}>Contact</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart" style={{ color: location.pathname === '/cart' ? '#d1a338' : 'white' }}>
                <i className="bi bi-cart"></i> {cartItemCount}
              </Nav.Link>
              {isLoggedIn ? (
                <Nav.Link onClick={handleLogout} style={{ color: 'white' }}>Logout</Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login" style={{ color: location.pathname === '/login' ? '#d1a338' : 'white' }}>Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
  
}

export default MyNavbar