import React, {useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../css/DeleteProduct.css'

const DeleteProduct = () => {
  const { id } = useParams();
  console.log("ID: ",id);

  const navigate = useNavigate();
  const[error, setError] = useState(null);
  
  const deleteProduct = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        setError("No token found. Please log in.");
        return;
    }
    console.log(token);

    try {
        const response = await fetch(`/api/admin/deleteProduct?id=${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            alert("Product deleted successfully");
            navigate("/admin/list"); // Redirect to the ShowEmployee page
        } else {
            setError("Failed to delete the employee record.");
        }
    } catch (error) {
        setError("An error occurred while deleting the employee record.");
    }
};

useEffect(() => {
    deleteProduct();
}, [id, navigate]);

return (
    <div className="delete-product-container">
        <h2>Delete Product</h2>
        <p>Are you sure you want to delete product ID: {id}?</p>
        <div className="button-container">
            <button onClick={deleteProduct} className="delete-button">Delete {id}</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {!error && <p className="loading-message">Deleting product...</p>}
    </div>
);
}

export default DeleteProduct