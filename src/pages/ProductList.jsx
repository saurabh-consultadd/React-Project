import React, { useState, useEffect } from 'react';
import '../css/ProductList.css'
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/user/showProduct', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate("/");
  }

  return (
    <div className="product-list-container">
        <h2>User Product List</h2>
        <ul>
            {products.map(product => (
                <li key={product.id}>
                    {product.name} - ${product.price}
                </li>
            ))}
        </ul>
        <button className="logout-button" onClick={logout}>Logout</button>
    </div>
);
};

export default ProductList;
