/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import React, { useEffect, useState } from 'react';
import { fetchSimilarProducts } from '../api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './index.css';
const SimilarProducts = ({ currentProductId,onAddToCart}) => {
    const navigate = useNavigate();
    const [similarProducts, setSimilarProducts] = useState([]);
    useEffect(() => {
        const fetchSimilar = async () => {
            try {
                const response = await fetch(`http://localhost:3001/products/${currentProductId}`);
                const product = await response.json();

                // Ensure similarProducts is defined and an array before using it
                if (product.similarProducts && Array.isArray(product.similarProducts)) {
                    setSimilarProducts(product.similarProducts);
                    console.log("similar products:", product.similarProducts);
                } else {
                    console.error("similarProducts is not an array or is undefined");
                }
            } catch (error) {
                console.error("Error fetching similar products:", error);
            }
        };

        fetchSimilar();
    }, [currentProductId]);
    const ViewDetails = (id) => {
        navigate(`/product/${id}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    return (
        <div className='card'>
            <h2 className='mt-3' style={{ textAlign: "center", fontSize: "200%" }}>Similar Products</h2>
            <div className="similar-products-container">
                {similarProducts.map((product) => (
                    <div key={product.id} className="similar-product-card">
                        <img src={product.image} alt={product.productName} width="100%" onClick={() => ViewDetails(product.id)}/>
                        <h3>{product.productName}</h3>
                        <p className="product-price">₹{product.priceRangeMin} - ₹{product.priceRangeMax}</p>
                        {/* Add any additional product details you want to display */}
                        <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default SimilarProducts