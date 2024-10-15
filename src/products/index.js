/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import React, { useEffect, useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function Products({ onAddToCart: externalOnAddToCart, onRemoveFromCart, clearCart }) {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);  // To store cart items
    const [isModalVisible, setModalVisible] = useState(false);  // To control modal visibility
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.log("Fetch failed", error);
            }
        };
        getProducts();
    }, []);

    // Internal function to handle adding product to cart
    const handleAddToCart = (product) => {
        setCartItems([...cartItems, product]);  // Add product to cart
        setModalVisible(true);  // Show the modal when an item is added

        // Call external onAddToCart if passed as prop
        if (externalOnAddToCart) {
            externalOnAddToCart(product);
        }
       
    };

    const handleRemoveFromCart = (productId) => {
        // Update cartItems by removing the item with the given productId
        const updatedCartItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCartItems); // Update state with filtered items;
        clearCart();
    };

    const ViewDetails = (id) => {
        navigate(`/product/${id}`);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalVisible(false);
    };

    const proceedToPay = () => {
        // Navigate to the ShippingAddress route
        navigate('/shippingAddress');
    };

    return (
        <div className='card mt-3'>
            <h2 className='mt-3' style={{ textAlign: "center", fontSize: "200%" }}>Featured Products</h2>
            <div className='card-body grid-container'>
                {products.slice(0, 8).map((product) => (
                    <div className="grid-item" key={product.id}>
                        <img
                            src={product.image}
                            className="product-image"
                            onClick={() => ViewDetails(product.id)}
                            alt={product.productName}
                        />
                        <h2 className="productName mt-3">{product.productName}</h2>
                        <button className='add-to-cart-btn' onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>

            {/* Modal for displaying cart items */}
            {isModalVisible && (
                <div className="cart-modal">
                    <div className="cart-modal-content">
                        <button className="close-modal" onClick={closeModal}>X Close</button>
                        <h3>Shopping Cart</h3>

                        {/* If the cart is empty, show a message */}
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            <>
                                {/* Display each cart item */}
                                <div className="cart-items">
                                    {cartItems.map((item, index) => (
                                        <div className="cart-item" key={index}>
                                            <img src={item.image} width='100px' height='100px' alt={item.productName} />
                                            <div className="cart-item-details">
                                                <h4>{item.productName}</h4>
                                                <p>1 x ₹{item.price}</p>
                                            </div>
                                            {/* <button
                                                className='remove'
                                                onClick={() => handleRemoveFromCart(item.id)}
                                            >
                                                X
                                            </button> */}
                                        </div>
                                    ))}
                                </div>

                                {/* Subtotal section */}
                                <div className="cart-subtotal">
                                    <p>Subtotal:</p>
                                    <p>₹{cartItems.reduce((total, item) => total + item.price, 0)}</p>
                                </div>

                                {/* View Cart and Checkout buttons */}
                                <div className="cart-buttons">
                                    <button className="view-cart-btn" onClick={() => navigate('/cart')}>
                                        View Cart
                                    </button>
                                    <button className="checkout-btn" onClick={proceedToPay}>
                                        Checkout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}


        </div>
    );
}
export default Products