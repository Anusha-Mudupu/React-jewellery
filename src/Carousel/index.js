/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import React from 'react';
import './index.css';

import { Carousel as BootstrapCarousel } from 'react-bootstrap';
const Carousel = () => {
  const images = [
    {
      id: 1,
      productName: "Traditional Gold Jewelry",
      description: "Exquisite traditional gold jewelry set.",
      price: 30000,
      discount: 12,
      image: "https://retailjewellerindia.com/wp-content/uploads/2020/01/3t8a7815-2.jpg"
      
    },
    {
      id: 2,
      productName: "Gold Bangles",
      description: "Beautiful gold bangles with a polished finish.",
      price: 18000,
      discount: 9,
      image: "https://img.freepik.com/free-photo/gold-jewellery-table-with-other-gold-jewellery_1340-42836.jpg"
    },
    {
      id: 3,
      productName: "Gold Choker Necklace",
      description: "Stylish gold choker necklace for an elegant look.",
      price: 27000,
      discount: 6,
      image: "https://etimg.etb2bimg.com/thumb/msid-105058534,width-1200,resizemode-4/.jpg"
    }
  ];
  return (
    // <div className="carousel-container">
    //   <BootstrapCarousel>
    //     {images.map((image) => (
    //       <BootstrapCarousel.Item key={image.id}>
    //         <img
    //           className="d-block w-100"
    //           src={image.image}
    //           alt={image.productName}
    //         />
          
    //       </BootstrapCarousel.Item>
    //     ))}
    //   </BootstrapCarousel>
    // </div>
    <div className="card">
    <div className="image-container">
      <img
        src="https://jewellerykhazana.com/wp-content/uploads/2023/09/uiiu-scaled-e1696107094354.jpg"
        alt="Anu Jewellery"
        className="first-image"
      />
      <div className="overlay-text">
        <h4 style={{color:"white"}}>Welcome To</h4>
        <h2 style={{fontSize:"200%"}}>Anu Jewellery</h2>
        <p style={{color:"#cd9617"}}>Exclusive 24KT Gold Plated Jewellery Manufacturer</p>
        <button type="button"  className="shop-Now">Shop Now</button>
      </div>
    </div>
  </div>

  )
}
export default Carousel