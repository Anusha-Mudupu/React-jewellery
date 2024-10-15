/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './index.css';
import { useNavigate } from 'react-router-dom';
const ProductCarousel = () => {
  const [Products, setProducts] = useState([]);
  console.log("menuIcons",Products)
  const [currentIndex, setCurrentIndex] = useState(0); // To track the visible product set
  const navigate = useNavigate();
  const [menuIcons, setMenuIcons] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products'); // API URL
        const data = await response.json();
        console.log("Fetched Data:", data); // Log the fetched data for debugging
  
        setProducts(data); // Set all products
  
        // Flatten all menuIcons and filter unique names
        const uniqueMenuIcons = data
          .flatMap(product => product.menuIcons || []) // Flatten all menu icons
          .reduce((acc, icon) => {
            // Check if the icon name already exists in the accumulator
            if (!acc.find(item => item.name === icon.name)) {
              acc.push(icon); // Add if it's unique
            }
            return acc;
          }, []);
  
        setMenuIcons(uniqueMenuIcons); // Set unique menu icons
      } catch (error) {
        console.error("Error fetching products:", error); // Log any errors
      }
    };
  
    fetchProducts();
  }, []);
  

  

  // Function to handle previous slide
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };
  const goToProductPage=(name)=>{
    navigate(`/ProductPage/${name}`); // Navigate to the product page with the product ID
  }
  return (
   
    <div className='card mt-3'>
    <h2 className='mt-3' style={{ textAlign: "center", fontSize: "200%" }}>
      Our Popular Categories
    </h2>
    <div className='card-body grid-container'>
      {menuIcons.length > 0 ? (
        menuIcons.map((product) => (
          <div className="grid-item" key={product.id}>
            <img
              src={product.image}
              className="product-image1"
              alt={`Product ${product.id}`}
              onClick={() => goToProductPage(product.name)}
              style={{ cursor: 'pointer', width: '100%', height: 'auto' }} // Ensuring the image is responsive
            />
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center" }}>Loading products...</p>
      )}
    </div>
  </div>
    

  );
}
export default ProductCarousel
