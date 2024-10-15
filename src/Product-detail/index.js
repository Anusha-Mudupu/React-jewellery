/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SimilarProducts from '../data/similarproducts';
import './index.css';
const ProductDetail = ({ onAddToCart }) => {
    const { id } = useParams();
    console.log("id",id)
    const [product, setProduct] = useState([]);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:3001/products/${id}`);
            const data = await response.json();
            console.log("product detail data",data)
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
        <div>
            <div className="product-detail">
                <div className="product-image">
                    <img src={product.image} alt={product.productName} width="100%" />
                </div>
                <div className="product-info">
                    <h2 style={{color:"black",fontSize:"30px"}}>{product.productName}</h2>
                    <p className="product-price">₹{product.priceRangeMin} - ₹{product.priceRangeMax}</p>

                    <div className="product-details">
                        <p><strong>BOX CONTAINS:</strong> {product.boxContains}</p>
                        <p><strong>MATERIAL:</strong> {product.material}</p>
                        <p><strong>WARRANTY:</strong> {product.warranty}</p>
                        <p><strong>EXPECTED DELIVERY:</strong> {product.deliveryTime}</p>
                    </div>

                    <div className="product-selection">
                        <div className="form-group row align-items-center">
                            <label htmlFor="size" className="col-sm-2 col-form-label">Size: </label>
                            <div >
                                <select className="form-control" id="size">
                                    {product.availableSizes ? (
                                        product.availableSizes.map((size, index) => (
                                            <option key={index} value={size}>
                                                {size}
                                            </option>
                                        ))
                                    ) : (
                                        <option>No sizes available</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row align-items-center">
                            <label htmlFor="size" className="col-sm-2 col-form-label">Unit: </label>
                            <div>
                                <select className='form-control' id="size">
                                    {product.units ? (
                                        product.units.map((unit, index) => (
                                            <option key={index} value={unit}>
                                                {unit}
                                            </option>
                                        ))
                                    ) : (
                                        <option>No units available</option>
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            
            <SimilarProducts currentProductId={id} onAddToCart={onAddToCart}
             />
            
        </div>

    );
};
export default ProductDetail