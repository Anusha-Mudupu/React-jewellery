/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import logo from './logo.svg';
import './App.css';
import Products from './products';
import Carousel from './Carousel';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from './Product-detail';
import MyNavbar from './Header';
import Cart from './Cart';
import Footer from './Footer';
import React, { useEffect, useState } from 'react';
import ProductCarousel from './MenuIcons';
import ShippingAddress from './ShippingAddres';
import DeliveredAddress from './DeliveredAddress';
import PaymentDetails from './PaymentDetails';
import Login from './login';
import Register from './Register';
import ViewOrder from './view-orders';
function App() {
  const [cartItems, setCartItems] = useState([]);
  const [users, setUsers] = useState([]); // Initialize an empty array for users
  // Function to handle adding products to the cart
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Handle removing an item from the cart
  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Handle quantity change (both increase and decrease)
  const onQuantityChange = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const clearCart = () => {
    setCartItems([]); // Clear the cart when payment is done
  };
  return (
    <div className='App-header'>
      <BrowserRouter> {/* Use BrowserRouter here */}
        <MyNavbar className="bg fixed-top" expand="lg" cartItemCount={cartItems.length} />

        <Routes>
          <Route path='/login' element={<Login users={users} />}></Route>
          <Route path='/register' element={<Register setUsers={setUsers} />}></Route>
          <Route path="/" element={<> <Carousel /> <ProductCarousel className="ProductCarousel" /> <Products onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} clearCart={clearCart}/> </>} />
          <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
          <Route path="/Cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} onQuantityChange={onQuantityChange}/>} />
          <Route path="/shippingAddress" element={<ShippingAddress />} />
          <Route path="/DeliveredAddress" element={<DeliveredAddress />} />
          <Route path="/PaymentDetails" element={<PaymentDetails cartItems={cartItems} clearCart={clearCart} />} />
          <Route path="/ViewOrder" element={<ViewOrder cartItems={cartItems} clearCart={clearCart}/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
