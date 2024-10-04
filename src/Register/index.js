/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Register = ({ setUsers }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Get the existing users from the backend (JSON Server)
      const response = await fetch('http://localhost:3001/users');
      const users = await response.json();

      // Check if the email is already registered
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        alert('Email is already registered!'); // Set error message

        return;
      }

      // Create the new user object
      const newUser = { email, password,name,phoneNumber,city};

      // POST the new user to the JSON Server
      const postResponse = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (postResponse.ok) {
        alert('Registration successful!');
        // Optionally fetch the updated users list and update state
        const updatedUsers = await postResponse.json(); // Get the newly created user
        setUsers((prevUsers) => [...prevUsers, updatedUsers]); // Update users state in parent
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        // Redirect to login page
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during registration:', error);

    }
  };

  return (
    <div className='container col-6' style={{ border: '1px solid #d1a338', position: 'relative', top: '10px', }}>
      <h2 style={{ textAlign: "center", color: "#d1a338" }}>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label style={{ color: "#d1a338" }}>Name:</label>
          <input
            type="text" className='form-control mb-2'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={{ color: "#d1a338" }}>Phone Number:</label>
          <input
            type="number" className='form-control mb-2'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={{ color: "#d1a338" }}>City:</label>
          <input
            type="text" className='form-control mb-2'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={{ color: "#d1a338" }}>Email:</label>
          <input
            type="email" className='form-control mb-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={{ color: "#d1a338" }}>Password:</label>
          <input
            type="password" className='form-control mb-2'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='form-control mb-2' >Register</button>
      </form>
    </div>
  )
}
export default Register