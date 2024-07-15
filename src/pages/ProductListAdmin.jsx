import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ProductListAdmin.css';

const ProductListAdmin = () => {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/admin/showProduct', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                setProducts(data);
            } catch (error) {
                navigate("/list");
                console.error('Error fetching products:', error);
            }
        };
        fetchData();
    }, []);

    // Edit Product page
    const editProduct = async (id) => {
        navigate(`/admin/edit/${id}`);
    };

    // Delete Product page
    const deleteProduct = (id) => {
        navigate(`/admin/delete/${id}`);
    }

    // Add Product page
    const addProduct = async () => {
        navigate("/admin/add");
    }

    const logout = () => {
        localStorage.removeItem('token');
        navigate("/");
    }

    return (
        <div className="product-list-container">
            <h2>Admin Product List</h2>
            <ul className="product-list">
                {products.map(product => (
                    <li key={product.id} className="product-item">
                        <span>{product.id} - {product.name} - ${product.price}</span>
                        <button className="edit-button" onClick={() => editProduct(product.id)}>Edit</button>
                        <button className="delete-button" onClick={() => deleteProduct(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button className="add-button" onClick={addProduct}>Add Product</button>
            <button className="logout-button" onClick={logout}>Logout</button>
        </div>
    );
};

export default ProductListAdmin;
