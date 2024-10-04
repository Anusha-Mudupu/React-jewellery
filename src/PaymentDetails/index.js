/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import React, { useEffect } from 'react';
import './index.css';
const PaymentDetails = ({ cartItems, clearCart }) => {
  console.log("payment details", cartItems)
  const navigate = useNavigate(); // Declare navigate hook

  const handleViewOrder = () => {
    // Save cartItems to localStorage
    localStorage.setItem('orderItems', JSON.stringify(cartItems));

    // Navigate to view order page
    navigate('/ViewOrder', { state: { cartItems } });
  };


  const continueShopping = () => {
    navigate('/');
    clearCart();
  }
  return (
    <div className='card'>
      <div className="PaymentDetails">
        <h1 style={{ color: '#d1a338' }}>Payment Details</h1>
        {cartItems && cartItems.length > 0 ? (
          <div>
            <h2>Order Items:</h2>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  {/* <p>{index + 1}</p> */}
                  <img src={item.image} width='100Px' height='100px' />
                  <p><strong>{item.street}</strong></p>
                  <p>Price: ₹{item.price}</p>
                  <p>discount: ₹{item.discount}</p>

                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No order items found.</p>
        )}
        <div className='paymentButtton'>
        <button className="add-to-cart-btn" onClick={handleViewOrder}>
          View Order
        </button>
        <button className='add-to-cart-btn' onClick={continueShopping}>
          Continue Shopping
        </button>
        </div>
        
      </div>
    </div>
  )
}
export default PaymentDetails
