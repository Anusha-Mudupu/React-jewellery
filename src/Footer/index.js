/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './index.css';
import { FaFacebook, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import topImage from '../Assests/Images/Logo 1.png'
import waveImage from '../Assests/Images/wave5.png'
const Footer = () => {
  return (
    <footer className="py-4 mt-auto footer" style={{ backgroundColor: "rgb(14, 1, 1)", color: "#fff" }}>
      {/* <Container>
        <Row className="text-center">
          <Col md={12}>
            <img 
              src={topImage} 
              alt="Logo" 
              style={{ width: "200px",height:"100px", marginBottom: "10px" }}
            />
          </Col>
        </Row>
        <Row className="text-center mb-3">
          <Col>
            <a href="/home" style={{ color: "#fff", textDecoration: "none", marginRight: "20px" }}>Home</a>
            <a href="/about-us" style={{ color: "#fff", textDecoration: "none", marginRight: "20px" }}>About Us</a>
            <a href="/shop" style={{ color: "#fff", textDecoration: "none", marginRight: "20px" }}>Shop</a>
            <a href="/contact-us" style={{ color: "#fff", textDecoration: "none", marginRight: "20px" }}>Contact Us</a>
            <a href="/privacy-policy" style={{ color: "#fff", textDecoration: "none", marginRight: "20px" }}>Privacy Policy</a>
            <a href="/refund-policy" style={{ color: "#fff", textDecoration: "none", marginRight: "20px" }}>Refund And Returns Policy</a>
            <a href="/warranty-info" style={{ color: "#fff", textDecoration: "none", marginRight: "20px" }}>Warranty Info</a>
            <a href="/terms-conditions" style={{ color: "#fff", textDecoration: "none" }}>Terms & Conditions</a>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <FaPhone style={{ marginRight: "5px" }} /> 9876543210
          </Col>
          <Col>
            <FaEnvelope style={{ marginRight: "5px" }} /> jewelleryAnu26@gmail.com
          </Col>
        </Row>
        <Row className="text-center mb-3">
          <Col>
            <FaMapMarkerAlt style={{ marginRight: "5px" }} /> 3130 Hydrabad road, Near Petrol bunk, Chityala
          </Col>
        </Row>
        <Row className="text-center mb-3">
          <Col>
            <a href="https://facebook.com" style={{ color: "#fff", marginRight: "15px" }}>
              <FaFacebook />
            </a>
            <a href="https://instagram.com" style={{ color: "#fff", marginRight: "15px" }}>
              <FaInstagram />
            </a>
            <a href="https://youtube.com" style={{ color: "#fff" }}>
              <FaYoutube />
            </a>
          </Col>
        </Row>
        <Row className="text-center" style={{backgroundColor:'#d1a338'}}>
          <Col >
            <p style={{ fontSize: "14px" }}>Copyrights 2023 All Rights Reserved.</p>
          </Col>
        </Row>
      </Container> */}
      <div>
<section id="social-media">

  <div class="container text-center">
    <p style={{color:"white"}}> FIND US ON SOCIAL MEDIA</p>
    <div class="social-icon" >
      <a href="https://facebook.com" style={{fontSize:"45px",color:"#d1a338"}} >
      <FaFacebook />
      </a>
      <a href="https://instagram.com" style={{fontSize:"50px",color:"#d1a338"}}>
      <FaInstagram />
      </a>
      <a href="https://youtube.com" style={{fontSize:"50px",color:"#d1a338"}}>
      <FaYoutube />
      </a>
      
    </div>
  </div>
</section>



<section id="footer">
  <img src={waveImage} class="footer-img"/>
  <div class="container">
    <div class="row">
      <div class="col-md-4 footer-box">
        <p><b> FOOTER</b></p>
        <p>Enjoy Customer-Friendly Features Like Easy Return Policy Try and Buy Option & More.
          Choose From a Wide Range Of.5 Lakhs Styles.
          2000+Brands.Premium Brands. 30 Days Return</p>
      </div>
      <div class="col-md-4 footer-box">
        <p><b>CONTACT US</b></p>
        <p><i class="fa fa-map-marker" aria-hidden="true"></i> Narsingi Road, Hyderabad </p>
        <p><i class="fa fa-phone" aria-hidden="true"></i> +91 9876543210 </p>
        <p><i class="fa fa-envelope-o" aria-hidden="true"></i> anuJewellery&#64;gmail.com </p>


      </div>
     
    </div>
    
    <p class="copyrights">Copyright 2021 DMantz - All Rights Reserved. Privacy Policy | Site Terms & Disclosures.</p>
  </div>
</section>
</div>
    </footer>
  );
};
export default Footer