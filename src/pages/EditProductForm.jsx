import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/EditProductForm.css'

const EditProductForm = ({ productId }) => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchProductDetails(productId);
    }, [productId]);

    const fetchProductDetails = async (productId) => {
        try {
            const response = await fetch(`/api/admin/changeProduct`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Attach JWT token
                }
            });

            if (response.ok) {
                const data = await response.json();
                setProduct(data); // Set product details state
            } else {
                throw new Error('Failed to fetch product details');
            }
        } catch (error) {
            console.error('Fetch product details error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/admin/changeProduct`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Attach JWT token
                },
                body: JSON.stringify(product)
            });

            if (response.ok) {
                alert('Product updated successfully');
                // Redirect or handle success
                navigate("/admin/list");
            } else {
                throw new Error('Failed to update product');
            }
        } catch (error) {
            console.error('Update product error:', error);
            alert('Failed to update product. Please try again.');
        }
    };

    return (
        <div className="edit-product-container">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit} className="edit-product-form">
                <div className="form-group">
                    <label htmlFor="id">ID:</label>
                    <input type="number" id="id" name="id" value={product.id} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={product.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" value={product.price} onChange={handleChange} />
                </div>
                {/* Add more fields as needed */}
                <button type="submit" className="submit-button">Update Product</button>
            </form>
        </div>
    );
};

export default EditProductForm;