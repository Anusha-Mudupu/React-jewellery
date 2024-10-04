/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './index.css';
const ProductCarousel = () => {
  const [Products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // To track the visible product set
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:3001/menuIcons'); // Replace with your JSON file path
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);
  const handleNext = () => {
    if (currentIndex + 4 < Products.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  // Function to handle previous slide
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };
  return (
    // <Container>
      <div className='card mt-3'>
        {/* <div className='card-header'> */}
        <h2 className='mt-3' style={{textAlign:"center",fontSize:"200%"}} >Our Popular Categories</h2>
        {/* </div> */}
        {/* <h2 className='mt-3' style={{position:"relative",left:"35%",color:"#d1a338"}}>Our Popular Categories</h2> */}
        <div className='card-body grid-container'>
          {
            Products.map((product) => (
              <div className="grid-item" key={product.id}>
                <img src={product.image} className="product-image1" />
                
              </div>
            )
            )

          }
        </div>
      </div>
    // </Container>

  );
}
export default ProductCarousel
