/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './index.css';
const ProductDetail=({onAddToCart})=>{
    const { id } = useParams();
    const [product, setProduct] = useState([]);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:3001/products/${id}`);
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (!product) {
        return <h3>Product not found</h3>;
    }

    return (
        <div className='card'>
        <div className="product-detail">
            <img src={product.image} alt={product.productName}  width="50%"/>
            <div className='product-information'>
            <h2>{product.productName}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Discount: {product.discount}%</p>
            <button className='add-to-cart-btn' onClick={() => onAddToCart(product)}>Add to Cart</button>
            </div>
            
        </div>
        </div>
    );
}
export default ProductDetail