/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './index.css';
const ProductPage = ({ Products, onAddToCart: externalOnAddToCart }) => {
    const { name } = useParams();
    console.log("menuiconName", name)
    const [selectedCategory, setSelectedCategory] = useState(name);
    const [cartItems, setCartItems] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [productDetails, setProductDetails] = useState(null);

    const navigate = useNavigate();
    const [selectedIcon, setSelectedIcon] = useState('All Products');
    const allMenuIcons = Products.flatMap(product => product.menuIcons || []);
    console.log("allMenuIcons", allMenuIcons)
    useEffect(() => {
        // Only show the product matching the URL param if no category is selected
        if (selectedCategory === 'All Products' || name) {
            const foundProduct = Products.find(product => product.name === name);
            if (foundProduct) {
                setProductDetails(foundProduct); // Set the found product details
                setSelectedIcon(name); // Update the displayed name/icon
            }
        }
    }, [name, Products, selectedCategory]);

    // Get unique product names for menu icons
    const menuIcons = Products.reduce((acc, product) => {
        if (product.menuIcons) {
            product.menuIcons.forEach(icon => {
                if (!acc.includes(icon.name)) {
                    acc.push(icon.name);
                }
            });
        }
        return acc;
    }, []);

    // Filter products by selected category (or by name from URL initially)
    const filteredProducts = Array.isArray(allMenuIcons)
        ? allMenuIcons.filter(product =>
            selectedCategory === 'All Products' || product.name === selectedCategory
        )
        : [];

    const handleAddToCart = (product) => {
        setCartItems([...cartItems, product]);
        setModalVisible(true);

        // Call external onAddToCart if passed as prop
        if (externalOnAddToCart) {
            externalOnAddToCart(product);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const ViewDetails = (id) => {
        navigate(`/product/${id}`);
    };

    const proceedToPay = () => {
        navigate('/shippingAddress');
    };

    const handleMenuIconClick = (iconName) => {
        setSelectedCategory(iconName);
        setSelectedIcon(iconName);
        setProductDetails(null); // Clear product details when a new category is selected
    };


    return (
        
        <div className='card' >
            <div className="hero-section" style={{
                backgroundImage: 'url(https://t3.ftcdn.net/jpg/09/64/51/90/360_F_964519076_joyehuCNEoBeQdrGzed7FqqDbaE86Bz7.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#fff',
                padding: '50px',
                textAlign: 'center',
                position: 'relative',
                height: '50%'
            }}>
                <h3 style={{ fontSize: '3rem', color: 'white', left: '-500px', position: "relative" }}>{selectedCategory}</h3>
            </div>
            <div className='product-page' >

                <div className="product-pages" style={{ display: 'flex', }}>

                    <div className="categories">
                        <h2>PRODUCT CATEGORIES</h2>
                        <h6>PRODUCT CATEGORIES</h6>
                        <ul>
                            <li style={{ color: 'rgb(14, 1, 1)' }} onClick={() => setSelectedCategory('All Products')}>
                                All Products
                            </li>
                            {menuIcons.map((iconName, index) => (
                                <li
                                    key={index}
                                    onClick={() => setSelectedCategory(iconName)}
                                    style={{
                                        fontWeight: selectedIcon === iconName ? 'bold' : '#d1a338', // Highlight selected icon
                                        color: selectedIcon === iconName ? '#d1a338' : 'rgb(14, 1, 1)' // Change color of selected icon
                                    }}
                                >
                                    {iconName}
                                </li>
                            ))}
                        </ul>

                    </div>

                    <div className="product-list">

                        {filteredProducts.map(product => (
                            <div className="product-card" key={product.id}>
                                <img src={product.image} alt={product.productName} onClick={() => ViewDetails(product.id)} />
                                <h3>{product.description}</h3>
                                <p>{product.price}</p>
                                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                            </div>
                        ))}
                    </div>
                </div>
                {isModalVisible && (
                    <div className="cart-modal">
                        <div className="cart-modal-content">
                            <button className="close-modal" onClick={closeModal}>X Close</button>
                            <h3>Shopping Cart</h3>

                            {cartItems.length === 0 ? (
                                <p>Your cart is empty.</p>
                            ) : (
                                <>
                                    <div className="cart-items">
                                        {cartItems.map((item, index) => (
                                            <div className="cart-item" key={index}>
                                                <img src={item.image} width='100px' height='100px' alt={item.productName} />
                                                <div className="cart-item-details">
                                                    <h4>{item.name}</h4>
                                                    <p>1 x ₹{item.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="cart-subtotal">
                                        <p>Subtotal:</p>
                                        <p>₹{cartItems.reduce((total, item) => total + item.price, 0)}</p>
                                    </div>

                                    <div className="cart-buttons">
                                        <button className="view-cart-btn" onClick={() => navigate('/cart')}>View Cart</button>
                                        <button className="checkout-btn" onClick={proceedToPay}>Checkout</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

        </div>
        
    );
};

export default ProductPage