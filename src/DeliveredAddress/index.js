/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useLocation } from 'react-router-dom';

import './index.css';
const DeliveredAddress = () => {
  // console.log('Cart Items in DeliveredAddress:', cartItems);
  const location = useLocation(); // Access the location object
  const [address, setAddress] = useState(location.state?.address || null); // Get address from state or default to null
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Empty dependency array means it only runs once when the component mounts
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: "rzp_test_wbkgQ7Kke2UeHE", // Replace with your Razorpay key
      amount: 100, // Amount in paise (e.g., 50000 paise = ₹500)
      currency: "INR",
      name: "Anu Jewellery",
      description: "Test Transaction",
      image: "https://your-logo-url.com/logo.png", // Add your company logo
      order_id: "", // Use order_id if created from backend
      handler: function (response) {
        console.log('Payment successful', response);
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        // Handle success logic here (e.g., backend confirmation)
        // After successful payment, navigate to PaymentDetails page
        navigate('/PaymentDetails', { state: { address } }); // Pass orderItems in state
      },
      prefill: {
        name: address?.name || "Guest User",
        email: "customer@example.com", // You can populate this dynamically
        contact: "9999999999"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (error) {
    return <p>Error: {error}</p>; // Show error message if fetching fails
  }


  return (
    <div className='card'>
      <div className='DeliveryAddress'>
        <h1 style={{ color: '#d1a338' }}>Delivered Address</h1>
        {address ? (
          <div>
            <p><strong>Name:</strong> {address.name}</p>
            <p><strong>Street:</strong> {address.street}</p>
            <p><strong>City:</strong> {address.city}</p>
            <p><strong>Postal Code:</strong> {address.zip}</p>
            
          </div>
        ) : (
          <p>No address found</p>
        )}
        <button className='add-to-cart-btn' onClick={handleRazorpayPayment}>
              Proceed to Pay
            </button>
      </div>
    </div>
  )
}
export default DeliveredAddress