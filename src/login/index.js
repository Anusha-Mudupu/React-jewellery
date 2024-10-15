/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ users }) => {
  console.log("login user", users)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    // Check if user exists
    const user = users.find((u) => u.email === email.trim() && u.password === password.trim());
    console.log("login user1", users)
    if (user || users.length === 0) {
      const token = "mocked_token";
      alert('Login successful!');
      localStorage.setItem('token', token);
      window.dispatchEvent(new Event("storage"));
      navigate('/');
    } else {
      alert('Invalid email or password');
    }
  };
  return (
    <div className='card'>
      <div className='mb-3'>
        <div className='container col-6' style={{ border: '1px solid #d1a338', position: 'relative', top: '10px', }}>
          <h2 style={{ textAlign: "center", color: "#d1a338" }}>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label style={{ color: "#d1a338" }}>Email:</label>
              <input
                type="email"
                value={email} className='form-control mb-2'
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
            <button type="submit" className='form-control mb-2' >Login</button>
          </form>
          <p style={{ color: "#d1a338" }}>
            Don't have an account? <Link to="/register">Register Here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Login