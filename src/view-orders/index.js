/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
const ViewOrder = ({ clearCart }) => {
  const navigate = useNavigate(); // Declare navigate hook
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    // Retrieve the order items from localStorage
    const storedOrderItems = localStorage.getItem('orderItems');
    console.log("storedOrderItems", storedOrderItems)
    if (storedOrderItems) {
      setOrderItems(JSON.parse(storedOrderItems)); // Parse the JSON back to JavaScript array
    }
  }, []);
  const continueShopping = () => {
    navigate('/');
    clearCart();
  }
  return (
    <div className='card'>
      <div className='PaymentDetails'>
        <h1 style={{ color: '#d1a338' }}>View Order</h1>
        {orderItems && orderItems.length > 0 ? (
          <ul>
            {orderItems.map((item, index) => (
              <li key={index}>
                <img src={item.image} width="100px" height="100px" alt={item.name} />
                <p><strong>{item.street}</strong></p>
                <p>Price: ₹{item.price}</p>
                <p>Discount: ₹{item.discount}</p>
              </li>
            ))}
            <button className='add-to-cart-btn' onClick={continueShopping}>
              Continue Shopping
            </button>
          </ul>
        ) : (
          <p>No items in your order.</p>
        )}
      </div>
    </div>
  )
}
export default ViewOrder