/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */

import './index.css';
import React from 'react';
function CartModal({ cartItems, onClose }){
return(
    <div>
          <div className="cart-modal">
            <button className="close-btn" onClick={onClose}>Close</button>
            <h3>Your Cart Items</h3>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>
                        <img src={item.image} alt={item.productName} className="cart-item-image" />
                        <span>{item.productName}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
)
}

export default CartModal