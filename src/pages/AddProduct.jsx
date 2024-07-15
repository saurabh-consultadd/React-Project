import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AddProduct.css'

const AddProduct = ({ productId }) => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProduct({...product, [name]:value});
    };

    console.log(JSON.stringify(product));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/admin/addProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Attach JWT token
                },
                body: JSON.stringify(product)
            });

            if (response.ok) {
                alert('Product added successfully');
                // Redirect or handle success
                navigate("/admin/list");
            } else {
                throw new Error('Failed to add product');
            }
        } catch (error) {
            console.error('Add product error:', error);
            alert('Failed to add product. Please try again.');
        }
    };

    return (
        <div className="add-product-container">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit} className="add-product-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={product.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" value={product.price} onChange={handleChange} />
                </div>
                {/* Add more fields as needed */}
                <button type="submit" className="submit-button">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
