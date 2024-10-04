/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import React, { useState, useEffect } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
const ShippingAddress = () => {
    const [address, setAddress] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        zip: '',
    });
    const [allAddresses, setAllAddresses] = useState([]); // To store multiple addresses
    const [showModal, setShowModal] = useState(false); // To handle modal visibility
    const [selectedAddress, setSelectedAddress] = useState(null); // To track selected address
    const navigate = useNavigate();

    useEffect(() => {
        // // Load addresses from localStorage (mocked for demonstration)
        const savedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
        setAllAddresses(savedAddresses);

        // Load the previously selected address from localStorage
        const savedSelectedAddress = JSON.parse(localStorage.getItem('selectedAddress'));
        if (savedSelectedAddress) {
            setSelectedAddress(savedSelectedAddress);
        }
    }, []);

    const proceedToPayDel = () => {
        // Navigate to the ShippingAddress route
        navigate('/DeliveredAddress', { state: { address: selectedAddress } });
    };

    const handleSelectAddress = (index) => {
        const selected = allAddresses[index];
        setSelectedAddress(selected);

        // Save the selected address to localStorage
        localStorage.setItem('selectedAddress', JSON.stringify(selected));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/addresses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(address),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Address saved:', result);
                // proceedToPayDel();
                setAllAddresses((prevAddresses) => [...prevAddresses, address]);

                // Save addresses to localStorage
                localStorage.setItem('addresses', JSON.stringify([...allAddresses, address]));

                // Clear the form
                setAddress({ name: '', street: '', city: '', state: '', zip: '' });

                // Close the modal
                setShowModal(false);
            } else {
                console.error('Error saving address');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='card'>
            <div className='container'>
                <h2>Shipping Address</h2>

                {/* Add Address Button */}
                <button className='add-to-cart-btn' onClick={() => setShowModal(true)}>
                    Add Address
                </button>

                {/* Modal for Adding New Address */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-container row">

                            {/* Close Button */}
                            <button
                                className="close-button"
                                onClick={() => setShowModal(false)}
                            >
                                &times;
                            </button>

                            {/* Left side - Form */}
                            <div className="col-md-6 modal-form-container">
                                <h2>Enter Address</h2>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={address.name}
                                        className="form-control mt-3"
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="street"
                                        placeholder="Street Address"
                                        value={address.street}
                                        className="form-control mt-3"
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        value={address.city}
                                        className="form-control mt-3"
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        value={address.state}
                                        className="form-control mt-3"
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="zip"
                                        placeholder="ZIP Code"
                                        value={address.zip}
                                        className="form-control mt-3"
                                        onChange={handleChange}
                                        required
                                    />
                                    <button type="submit" className="btn btn-success form-control mt-3">
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary form-control mt-3"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </form>
                            </div>

                            {/* Right side - Image */}
                            <div className="col-md-6 modal-image-container d-flex justify-content-center align-items-center">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNjJ-nvOoR7BvUfoBrSRKFIg0XpAJGWKn2RXdXoV6LNfo3rnIMviH7KkgABzFqSLZVe5E&usqp=CAU"
                                    alt="Address"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                )}



                {/* Display Existing Addresses with Radio Buttons */}
                {allAddresses.length > 0 && (
                    <div className="address-list mt-5">
                        <h3>Select an Existing Address:</h3>
                        {allAddresses.map((addr, index) => (
                            <div key={index} className="form-check mt-3">
                                <input
                                    type="radio"
                                    name="selectedAddress"
                                    id={`address-${index}`}
                                    className="form-check-input"
                                    onChange={() => handleSelectAddress(index)}
                                    checked={selectedAddress && selectedAddress.name === addr.name} // This allows it to be checked based on user selection
                                />
                                <label htmlFor={`address-${index}`} className="form-check-label">
                                    <strong>{addr.name}</strong> - {addr.street}, {addr.city}, {addr.state}, {addr.zip}
                                </label>
                            </div>
                        ))}
                    </div>
                )}

                {/* Proceed with Selected Address */}
                {selectedAddress && (
                    <button className='add-to-cart-btn mb-3' onClick={proceedToPayDel}>
                        Proceed with Selected Address
                    </button>
                )}
            </div>
        </div>
    );
}
export default ShippingAddress