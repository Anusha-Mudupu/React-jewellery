/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import './index.css';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, onRemoveFromCart, onQuantityChange }) => {
  const navigate = useNavigate();
  console.log("cartItems", cartItems);
  const proceedToPay = () => {
    // Navigate to the ShippingAddress route
    navigate('/shippingAddress');
  };
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  return (
    <div className='card'>
      <div className="row">
        {/* Cart Items Section */}
        <div className="col-md-8">
          <div className="card p-3">
            <h3 className="mb-4">CART ITEMS</h3>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <button
                          className="btn btn-link text-danger"
                          onClick={() => onRemoveFromCart(item.id)}
                        >
                          &times;
                        </button>
                      </td>
                      <td>
                        <img
                          src={item.image}
                          width="50px"
                          height="50px"
                          alt={item.productName}
                        />
                        <div>{item.productName}</div>
                      </td>
                      <td>₹{item.price}</td>
                      <td>
                        <Button variant="light" onClick={() => onQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button variant="light" onClick={() => onQuantityChange(item.id, item.quantity + 1)}>+</Button>
                      </td>
                      <td>₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Billing Summary Section */}
        
          <div className="col-md-4 mb-3" style={{ border: '1px solid gray', position: 'relative', left: '-10px', top: '10px',height:"300px" }}>
            <div className="card p-4">
              <h3>CART TOTALS</h3>
              <hr />
              <div className="d-flex justify-content-between">
                <p>Subtotal</p>
                <p>₹{calculateSubtotal()}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Shipping</p>
                <p>Free shipping</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Total</p>
                <p>₹{calculateSubtotal()}</p>
              </div>
              <button className="btn btn-primary w-100 mt-3" onClick={proceedToPay}>
                CHECKOUT
              </button>
            </div>
          </div>
        
      </div>
    </div>
  );
}
export default Cart